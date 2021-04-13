import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { AppConfig } from "src/config";
import { IdDto, RequestPayload } from "src/helpers";
import { ProductAttribute } from "src/internal";
import { AttributeValueService } from "../product-group/attribute-value/attribute-value.service";
import { AttributeService } from "../product-group/attribute/attribute.service";
import { CreateProductDto, ProductType } from "../product-group/product";
import { ProductCategory } from "../product-group/product-category";
import { ProductCategoryService } from "../product-group/product-category/product-category.service";
import { ProductService } from "../product-group/product/product.service";
import { ImageService } from "../upload-group/image/image.service";
import { ImportProduct } from "./entities/import-product.entity";
import * as path from "path"
import { generateFilename } from "../upload-group/upload.helpers";
const csv = require('csv-parser')
const fs = require('fs')
const https = require('https');
const Stream = require('stream').Transform;
@Injectable()
export class ImportHelpersService {
    payload: RequestPayload
    constructor(
        private productService: ProductService,
        private categoryService: ProductCategoryService,
        private attributeService: AttributeService,
        private attributeValueService: AttributeValueService,
        private imageService: ImageService
    ) { }
    async downloadImage(url: string) {
        return new Promise((resolve, reject) => {
            https.request(url, function (response) {
                var data = new Stream();

                response.on('data', function (chunk) {
                    data.push(chunk);
                });

                response.on('end', async () => {
                    const urlParts = url.split('/')
                    let filename = urlParts[urlParts.length - 1]
                    const file = {
                        originalname: filename,
                        filename
                    }
                    await new Promise(resolve => generateFilename(null, file, resolve))
                    const writePath = path.join(AppConfig.get<string>('upload.destination'), file.filename)
                    fs.writeFileSync(writePath, data.read());
                    resolve(file)
                });
            }).end();
        })
    }


    async importData(file, payload: RequestPayload) {
        this.payload = payload
        let currentItems = [];
        let limit = 0;
        const stream = fs.createReadStream(file)
            .pipe(csv({ separator: ';' }))

        stream.on('data', async (data: ImportProduct) => {
            if (limit >= 1000) return
            if (data.Type !== 'variation') {
                if (currentItems.length) {
                    stream.pause()
                    await this.makeProducts(currentItems)
                    stream.resume()
                }
                currentItems = []
            }
            currentItems.push(data)

            limit++
        })
            .on('end', () => {
                console.log('done')
            });
    }
    getLocaleValues(values: any) {
        const defaultLocale = this.payload.getLocale()
        return {
            localeId: defaultLocale.id,
            ...values
        }
    }
    makeSlug(name: string) {
        return slugify(name, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
        })
    }
    async makeCategories(item: ImportProduct): Promise<IdDto[]> {
        const categoryNames = item.Categories.split('>').map(catName => catName.trim())
        const resolvers = categoryNames.map(async categoryName => {
            return await this.categoryService.findByName({ name: categoryName }, this.payload)
        })
        const categories = await Promise.all(resolvers)
        const initedCategories = []
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            if (!category) {
                const currentName = categoryNames[i]
                let parent = i == 0 ? null : { id: categories[i - 1].id }
                let createdCategory = await this.categoryService.create({
                    data: {
                        locale: [this.getLocaleValues({ name: currentName })],
                        slug: this.makeSlug(currentName),
                        parent
                    }
                }, this.payload)
                initedCategories.push(createdCategory)
            } else {
                initedCategories.push(category)
            }
        }


        return [{ id: initedCategories[initedCategories.length - 1].id }]
    }
    async makeAttributes(item: ImportProduct): Promise<{ attrId: number; attrValues: IdDto[]; }[]> {
        const attributes = Object.keys(item).map(key => {
            const isAttrName = key.match(/Attribute (\d) name/i)
            if (!isAttrName) return
            const attrNameIdx = isAttrName[1]
            const attrValue = item[`Attribute ${attrNameIdx} value(s)`]
            if (!attrValue) return
            const attrValues: string[] = attrValue.split(', ')
            return {
                attr: item[key],
                attrValues
            }
        }).filter(item => !!item)
        const resolvers = attributes.map(async attr => {
            let attribute = await this.attributeService.findByName({ name: attr.attr }, this.payload)
            if (!attribute) {
                attribute = await this.attributeService.create({
                    data: {
                        locale: [this.getLocaleValues({ name: attr.attr })],
                        slug: this.makeSlug(attr.attr)
                    }
                }, this.payload)
            }
            const resolvers = attr.attrValues.map(async (attrValueName: string) => {
                let attrValue = await this.attributeValueService.findByName({ name: attrValueName }, this.payload)
                if (!attrValue) {
                    attrValue = await this.attributeValueService.create({
                        data: {
                            locale: [this.getLocaleValues({ name: attrValueName })],
                            slug: this.makeSlug(attrValueName),
                            attributeId: attribute.id
                        }
                    }, this.payload)
                }
                return { id: attrValue.id }
            })
            const attrValues = await Promise.all(resolvers)

            return {
                attrId: attribute.id,
                attrValues: attrValues
            }
        })
        const madeAttributes = await Promise.all(resolvers)
        return madeAttributes
    }

    // [0] - mainProduct - other variations
    async makeProducts(products: ImportProduct[]) {
        if (!products.length) return
        const mainItem = products[0]
        const categories = await this.makeCategories(mainItem)
        const mainItemToCreate = await this.makeProduct(mainItem)
        const productVariations = products.slice(1)
        const resolvers = productVariations.map(async item => {
            const product = await this.makeVariation(item)
            return product
        })

        const variations = await Promise.all(resolvers)
        const madeVariations = variations
        console.log('made variations', madeVariations)
        const productToCreate: CreateProductDto = {
            ...mainItemToCreate,
            type: ProductType.variation,
            variations: madeVariations,
            category: categories,
        }

        console.log('ready to create', productToCreate)
        const exists = await this.productService.findBySlug({ slug: mainItemToCreate.slug }, this.payload)
        let result
        if (exists) {
            result = await this.productService.updateById({ id: exists.id, data: productToCreate }, this.payload)
        } else {
            result = await this.productService.create({ data: productToCreate }, this.payload)
        }
        // console.log('created', productToCreate)
        console.log('done')
        // fs.writeFileSync('test.json', JSON.stringify(variations))
    }
    async makeProductImages(item: ImportProduct): Promise<IdDto[]> {
        return []
        const imagesPath = item.Images.split(', ').slice(0,1)
        const resolvers = imagesPath.map(async path => {
            const file = await this.downloadImage(path)
            const image = this.imageService.upload({ file, alt: '' }, this.payload)
            return image
        })
        const images = await Promise.all(resolvers)
        return images.map(image => ({ id: image.id }))
    }
    async makeProductPrice(item: ImportProduct) {
        let price = parseInt(item['Regular price'])
        let oldPrice;
        let sale;
        if (isNaN(price)) {
            console.log('wtf', item)
        }
        if (item['Sale price']) {
            oldPrice = price
            price = parseInt(item['Sale price'])

            sale = Math.round((price / oldPrice) * 100)
        }
        return {
            currencyId: this.payload.getCurrency().id,
            price,
            oldPrice,
            sale
        }
    }
    async makeProduct(item: ImportProduct) {
        console.log('prod')
        let attributes = await this.makeAttributes(item)
        const productAttributes = attributes.map(attribute => ({...attribute}))
        console.log('prod attrs')
        const images = await this.makeProductImages(item)
        console.log('prod images')

        // const productPrice = await this.makeProductPrice(item)
        let defaultImage = null
        if (images.length) {
            defaultImage = { id: images[0].id }
        }
        const product = {
            locale: [
                this.getLocaleValues({
                    name: item.Name,
                    description: [{
                        tab: "",
                        content: item.Description
                    }]
                })
            ],
            slug: this.makeSlug(item.Name),
            sku: item.SKU,
            attributes: productAttributes,
            defaultImage,
            images,
            // prices: [productPrice]
        }
        return product
    }
    async makeVariation(item: ImportProduct) {
        const attributes = await this.makeAttributes(item)
        console.log('prod attrs var')

        const variationAttributes = attributes.map(attr => ({ attrId: attr.attrId, attrValueId: attr.attrValues[0] && attr.attrValues[0].id }))
        const images = await this.makeProductImages(item)
        console.log('prod images var')

        const productPrice = await this.makeProductPrice(item)
        console.log('prod price var')

        let defaultImage = null
        if (images.length) {
            defaultImage = { id: images[0].id }
        }
        const product = {
            locale: [
                this.getLocaleValues({
                    name: item.Name,
                    description: [
                        {
                            tab: '',
                            content: item.Description
                        }
                    ]
                })
            ],
            sku: item.SKU,
            attributes: variationAttributes,
            images,
            defaultImage,
            prices: [productPrice]
        }
        return product
    }
}