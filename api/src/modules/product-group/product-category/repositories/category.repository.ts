import { ConflictException } from '@nestjs/common';
import { RequestPayload } from 'src/helpers';
import { ArrayResponse, DefaultRepository, ID, SLUG } from 'src/internal';
import { ProductCategory } from "../index"
import { DeleteResult, EntityManager, EntityRepository, Repository, Transaction, TreeRepository } from 'typeorm';
import { ProductCategoryName } from '../product-category.constants';
import { DefaultTreeRepository } from 'src/blueprints/tree.repository';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends DefaultTreeRepository<ProductCategory> {
    public treeRepository: TreeRepository<ProductCategory>
    public name = ProductCategoryName
    constructor(public manager: EntityManager) {
        super(manager, ProductCategory)
    }

    async findByFullSlug({ slug }: { slug: string }, payload: RequestPayload) {
        const slugs = slug.split('/')
        let item: ProductCategory = null
        for (let idx = 0; idx < slugs.length; idx++) {
            const slug = slugs[idx]
            if (idx === 0) {
                item = await this.findBySlug({ slug }, payload)
            } else {
                if (!item) return null
                item = await this.findBySlug({ slug, parentId: item.id }, payload)
            }
        }
        return item
    }
    async findChildren(item: ProductCategory, payload: RequestPayload) {
        const query = this.treeRepository.createDescendantsQueryBuilder(this.name, `${this.name}Closure`, item)
            .where(`${this.name}.parentId = :parentId`, { parentId: item.parentId })
        this.populate(query, payload)
        this.restrictions(query, payload)
        return query.getMany()
    }
    async findBreadcrumbsById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        const items = await this.findParents(item, payload)
        return new ArrayResponse(items)
    }

}
