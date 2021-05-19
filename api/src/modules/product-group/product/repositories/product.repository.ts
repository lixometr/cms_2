import {
  RequestPayload,
  DefaultRepository,
  IAvailableFilters,
} from 'src/internal'
import { Attribute } from 'src/internal'
import { ID, SerializeGroup } from 'src/internal'
import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  SelectQueryBuilder,
} from 'typeorm'
import { Product } from '../entities/product.entity'
import { filterItems, getFilters } from 'src/internal'
import { ProductFiltersResponse } from 'src/internal'
import { ProductName } from '../product.constants'
import { ProductStatus } from '../product.types'
import { ProductCategoryRepository } from '../../product-category/repositories/category.repository'
import { ProductCategory } from '../../product-category'
import { BadRequestException } from '@nestjs/common'

import { ArrayResponse } from 'src/helpers'

@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {
  public name = ProductName
  // populate(query: SelectQueryBuilder<Product>, payload: RequestPayload) {
  //     FindOptionsUtils.joinEagerRelations(query, query.alias, query.expressionMap.mainAlias!.metadata)

  //     return query
  // }
  // async findById({ id }: { id: ID}, payload: RequestPayload): Promise<Product> {
  //     return await this.findOne({ where: { id } })
  // }
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
      query.andWhere(`${this.name}.status = :status`, {
        status: ProductStatus.Published,
      })
    }
    return query
  }
  async findCategoriesById({ id }: { id: ID }, payload: RequestPayload) {
    console.log('where?', id)
    // const item = await this.findOne({
    //   where: { id },
    //   relations: ['category'],
    // })
    const query = this.createQueryBuilder(
      this.name,
    ).where(`${this.name}.id = :id`, { id })
    const item = await query.getOne()
    console.log(item)
    return item
  }
  async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
    const query = this.QFindByCategoryId({ id }, payload)
    return await this.findMany(query, payload)
  }
  async findSimilarItems({ id }: { id: ID }, payload: RequestPayload) {
    const query = this.createQueryBuilder(this.name)
      .where(`${this.name}.id = :id`, { id })
      .leftJoinAndSelect(`${this.name}.attendProducts`, 'attendProducts')
    const item = await this.findOneWithRestrictions(query, payload)
    if (!item) throw new BadRequestException('Item with such id not found')
    const attendProducts = item.attendProducts
    const resolvers = attendProducts.map(async (item) => {
      return await this.findById({ id: item.productId }, payload)
    })
    const items = await Promise.all(resolvers)
    return new ArrayResponse(items)
    // const catIds = item.category.map(cat => cat.id)
    // if (!catIds || catIds.length < 1) catIds.push(-1)
    // const query = this.createQueryBuilder(this.name)
    //     .leftJoinAndSelect(`${this.name}.category`, '_category')
    //     .where(`_category.id  IN (:...ids)`, { ids: catIds })
    //     .andWhere(`${this.name}.id <> :id`, { id })
    // return this.findMany(query, payload)
  }
  async findWithFilters(
    {
      query,
      availableFilters,
    }: {
      query: SelectQueryBuilder<Product>
      availableFilters?: IAvailableFilters
    },
    payload: RequestPayload,
  ) {
    this.populate(query, payload)
    this.orderBy(query, payload)
    this.restrictions(query, payload)

    let items = await query.getMany()
    // const currency = payload.getCurrency()
    const resolvers = items.map(async (item) => {
      await item.serialize(payload)
      return item
    })
    items = await Promise.all(resolvers)
    const filters = payload.getFilters()
    const filteredItems = filterItems(items, filters)
    const withPagination = this.paginate(filteredItems, payload)
    const filtersToSend = getFilters(items, availableFilters)
    return new ProductFiltersResponse({
      ...withPagination,
      filters: filtersToSend,
    })
  }
  async findByCategoryIdWithFilters({ id }, payload: RequestPayload) {
    const categoryRepository = getCustomRepository(ProductCategoryRepository)

    const {
      items: categoryBreadcrumbs,
    } = await categoryRepository.findChildrenById({ id }, payload)
    const ids = categoryBreadcrumbs.map((cat) => cat.id)
    ids.push(id)
    const query = this.QFindByCategoryIds({ ids }, payload)

    const category = await categoryRepository.findOne({ where: { id } })
    const availableFilters = {
      attributes: category.availableFilterAttributes,
      price: category.showFilterPrice,
    }
    return this.findWithFilters({ query, availableFilters }, payload)
  }

  async findAllWithFilters({}, payload: RequestPayload) {
    const query = this.createQueryBuilder(this.name)
    return this.findWithFilters({ query }, payload)
  }
}
