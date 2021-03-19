import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload, SLUG } from 'src/internal';
import { ID, ProductCategory } from 'src/internal';
import { ProductCategoryName } from './product-category.constants';
import { ProductCategoryRepository } from './repositories/category.repository';

@Injectable()
export class ProductCategoryService extends ServiceBlueprint<ProductCategory>{
  public name = ProductCategoryName
  constructor(private itemRepository: ProductCategoryRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

  async findByFullSlug({ slug }: { slug: SLUG }, payload: RequestPayload) {
    return this.itemRepository.findByFullSlug({ slug }, payload)
  }

  findTrees({ }, payload: RequestPayload) {
    return this.itemRepository.findTrees({}, payload)
  }
  async findBreadcrumbsById({ id }: { id: ID }, payload: RequestPayload) {
    return await this.itemRepository.findBreadcrumbsById({ id }, payload)
  }
  async findChildrenById({ id }: { id: ID }, payload: RequestPayload) {
    return await this.itemRepository.findChildrenById({ id }, payload)
  }
  async findChildrenTreeById({ id }: { id: ID }, payload: RequestPayload) {
    return await this.itemRepository.findChildrenTreeById({ id }, payload)
  }
  async findParentsById({ id }: { id: ID }, payload: RequestPayload) {
    const items = await this.itemRepository.findParentsById({ id }, payload)
    return items
  }

  async findParentsTreeById({ id }: { id: ID }, payload: RequestPayload) {
    return this.itemRepository.findParentsTreeById({ id }, payload)
  }

}
