import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { classToPlain, plainToClass } from 'class-transformer';

import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { ID } from 'src/internal';
import { EventName, SLUG } from 'src/internal';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductBo } from './bo/product.bo';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductInfoDto } from './dto/product-info.dto';
import { ProductInfo } from './entities/product-info.entity';
import { Product } from './entities/product.entity';
import { ProductName } from './product.constants';
import { ProductType } from './product.types';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService extends ServiceBlueprint<Product>{
    public name = ProductName
    constructor(private productRepository: ProductRepository, private eventEmiter: EventEmitter2, private categoryService: ProductCategoryService) { super(productRepository, eventEmiter) }

    async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
        return this.productRepository.findByCategoryIdWithFilters({ id }, payload)
    }
    async findByCategoryFullSlug({ slug }: { slug: SLUG }, payload: RequestPayload) {

        const category = await this.categoryService.findByFullSlug({ slug }, payload)
        if (!category) throw new BadRequestException('Category with such slug not found')
        return this.findByCategoryId({ id: category.id }, payload)
    }
    async findAllWithFilters({ }, payload: RequestPayload) {
        await this.eventEmiter.emitAsync(`${this.name}.${EventName.beforeFindAll}`, { payload })
        const result = await this.productRepository.findAllWithFilters({}, payload)
        await this.eventEmiter.emitAsync(`${this.name}.${EventName.afterFindAll}`, { result, payload })
        return result
    }

    async findSimilarItems({ id }: { id: ID }, payload: RequestPayload) {
        return this.productRepository.findSimilarItems({ id }, payload)
    }

    async getItemInfo({ id, info }: { id: ID, info: ProductInfoDto }, payload: RequestPayload) {
        const product = await this.findById({ id }, payload)
        if (!product) throw new BadRequestException('Product not found')
        await product.serialize(payload)
        const productBo = new ProductBo({ product, activeOptions: info.activeOptions, activeVariation: info.activeVariation, cnt: info.cnt || 1 })
        const totalPrice = productBo.getTotalPrice()
        const totalPriceNoSale = productBo.getTotalPriceNoSale()
        const optionsPrice = productBo.getOptionsPrice()
        let productInfo = {
            ...product,
            totalPrice,
            totalPriceNoSale,
            optionsPrice,
            cnt: info.cnt,
            activeOptions: info.activeOptions,
            activeVariation: info.activeVariation
        }
        if (product.type === ProductType.variation) {
            const activeVariation = productBo.getActiveVariation()
            if (activeVariation) {
                const variationProps = {
                    price: activeVariation.price,
                    oldPrice: activeVariation.oldPrice,
                    sale: activeVariation.sale,
                    description: activeVariation.description,
                    images: activeVariation.images,
                    defaultImage: activeVariation.defaultImage,
                    name: activeVariation.name,
                    sku: activeVariation.sku,
                }

                productInfo = { ...productInfo, ...variationProps }
            }
            console.log("final product info", productInfo)
        }
        return new ProductInfo(productInfo)
    }

    async clone({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id })
        if (!item) throw new BadRequestException('Such item not found')
        delete item.id
        item.slug = `${item.slug}-clone`
        const itemPalin = classToPlain(item)
        const removeIds = (item: any) => {
            if (Array.isArray(item)) {
                item.map(itm => removeIds(itm))
            }
            if (item && typeof item === 'object') {
                Object.keys(item).map(key => {
                    if (key === 'id') {
                        delete item.id
                    }

                    removeIds(item[key])
                })
            }
        }
        removeIds(itemPalin)
        const toCreate = plainToClass(CreateProductDto, itemPalin)

        console.log(toCreate)
        const result = await this.create({ data: toCreate }, payload)
        return result
    }
}
