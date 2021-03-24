import { RequestPayload, DefaultRepository, IAvailableFilters } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID, SerializeGroup } from 'src/internal';
import { EntityRepository, getCustomRepository, getRepository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { filterItems, getFilters } from "src/internal"
import { ProductFiltersResponse } from 'src/internal';
import { ProductName } from '../product.constants';
import { ProductStatus } from '../product.types';
import { ProductCategoryRepository } from '../../product-category/repositories/category.repository';
import { ProductCategory } from '../../product-category';
import { BadRequestException } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {
    public name = ProductName

    QFindByCategoryId({ id }, payload: RequestPayload) {
        return this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, '_category')
            .where('_category.id = :id', { id })

    }
    QFindByCategoryIds({ ids }: { ids: ID[] }, payload: RequestPayload) {
        return this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, '_category')
            .where('_category.id IN (:...ids)', { ids })

    }

    restrictions(query: SelectQueryBuilder<Product>, payload: RequestPayload) {
        super.restrictions(query, payload)
        const groups = payload.getGroups()
        if (!groups.includes(SerializeGroup.Admin)) {
            query.andWhere(`${this.name}.status = :status`, { status: ProductStatus.Published })
        }
        return query
    }
    async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
        const query = this.QFindByCategoryId({ id }, payload)
        return await this.findMany(query, payload)
    }
    async findSimilarItems({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        if (!item) throw new BadRequestException('Item with such id not found')
        const catIds = item.category.map(cat => cat.id)
        if (!catIds || catIds.length < 1) catIds.push(-1)
        const query = this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, '_category')
            .where(`_category.id  IN (:...ids)`, { ids: catIds })
            .andWhere(`${this.name}.id <> :id`, { id })
        return this.findMany(query, payload)

    }
    async findWithFilters({ query, availableFilters }: { query: SelectQueryBuilder<Product>, availableFilters?: IAvailableFilters }, payload: RequestPayload) {
        this.populate(query, payload)
        this.orderBy(query, payload)
        this.restrictions(query, payload)

        let items = await query.getMany()
        // const currency = payload.getCurrency()
        const resolvers = items.map(async item => {
            await item.serialize(payload)
            return item
        })
        items = await Promise.all(resolvers)
        const filters = payload.getFilters()
        const filteredItems = filterItems(items, filters)
        const withPagination = this.paginate(filteredItems, payload)
        const filtersToSend = getFilters(filteredItems, availableFilters)
        return new ProductFiltersResponse({
            ...withPagination,
            filters: filtersToSend
        })
    }
    async findByCategoryIdWithFilters({ id }, payload: RequestPayload) {
        const categoryRepository = getCustomRepository(ProductCategoryRepository)

        const {items: categoryBreadcrumbs} = await categoryRepository.findChildrenById({ id }, payload)
        const ids = categoryBreadcrumbs.map(cat => cat.id)
        ids.push(id)
        const query = this.QFindByCategoryIds({ ids }, payload)

        const category = await categoryRepository.findOne({ where: { id } })
        const availableFilters = {
            attributes: category.availableFilterAttributes,
            price: category.showFilterPrice
        }
        return this.findWithFilters({ query, availableFilters }, payload)
    }

    async findAllWithFilters({ }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
        return this.findWithFilters({ query }, payload)
    }

}
