import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { classToPlain } from 'class-transformer';

import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { ID } from 'src/internal';
import { EventName, SLUG } from 'src/internal';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductBo } from './bo/product.bo';
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
        console.log(slug)

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
        const optionsPrice = productBo.getOptionsPrice()
        let productInfo = {
            ...product,
            totalPrice,
            optionsPrice,
            cnt: info.cnt,
            activeOptions: info.activeOptions,
            activeVariation: info.activeVariation
        }
        if(product.type === ProductType.variation) {
            const activeVariation = productBo.getActiveVariation()
            if(activeVariation) {
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
                productInfo = {...productInfo, ...variationProps}
            }
        }
       return new ProductInfo(productInfo)
    }

}
