import { ConflictException } from '@nestjs/common';
import { RequestPayload } from 'src/helpers';
import { ArrayResponse, DefaultRepository, ID, SLUG } from 'src/internal';
import { ProductCategory } from "../index"
import { DeleteResult, EntityManager, EntityRepository, Repository, Transaction, TreeRepository } from 'typeorm';
import { ProductCategoryName } from '../product-category.constants';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends DefaultRepository<ProductCategory> {
    public treeRepository: TreeRepository<ProductCategory>
    public name = ProductCategoryName
    constructor(public manager: EntityManager) {
        super()
        this.treeRepository = this.manager.getTreeRepository(ProductCategory)

    }
    async findBySlug({ slug, parentId }: { slug: SLUG, parentId?: ID }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
            .where(`${this.name}.slug = :slug`, { slug })
        if (parentId !== undefined) {
            query.andWhere(`${this.name}.parentId = :parentId`, { parentId })
        }
        return await this.findOneWithRestrictions(query, payload)
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
    async findTrees({}, payload: RequestPayload) {
        const items = await this.treeRepository.findTrees()
        return new ArrayResponse(items)
    }
    async findRoots() {
        const items = await this.treeRepository.findRoots()
        return new ArrayResponse(items)
    }
    async findChildren(category: ProductCategory) {
        return await this.treeRepository.findDescendants(category)
    }
    async findChildrenById({ id }: { id: ID }, payload: RequestPayload) {
        const category = await this.findById({ id }, payload)
        let items = await this.findChildren(category)
        items = items.filter(item => item.id !== id)
        return new ArrayResponse(items)
    }

    async findChildrenTree(category: ProductCategory) {
        return await this.treeRepository.findDescendantsTree(category)
    }
    async findChildrenTreeById({ id }: { id: ID }, payload: RequestPayload) {
        const category = await this.findById({ id }, payload)
        return await this.findChildrenTree(category)
    }
    async findParents(category: ProductCategory) {
        return await this.treeRepository.findAncestors(category)
    }
    async findParentsById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        const query = this.treeRepository.createAncestorsQueryBuilder(this.name, 'parent', item)
        this.populate(query, payload)
        let items = await query.getMany()
        items = items.reverse()
        const Response = new ArrayResponse(items)
        await Response.changeItems(items => items.filter(item => item.id !== id))
        return Response
    }
    async findBreadcrumbsById({ id }: { id: ID }, payload: RequestPayload) {
        const category = await this.findById({ id }, payload)
        const items = await this.findParents(category)
        return new ArrayResponse(items)
    }
    async findParentsTree(category: ProductCategory) {
        return await this.treeRepository.findAncestorsTree(category)
    }
    async findParentsTreeById({ id }: { id: ID }, payload: RequestPayload) {
        const category = await this.findById({ id }, payload)
        return await this.findParentsTree(category)
    }
    async countParents(category: ProductCategory) {
        return await this.treeRepository.countAncestors(category)
    }
    async countParentsById({ id }: { id: ID }, payload: RequestPayload) {
        const category = await this.findById({ id, }, payload)
        return await this.countParents(category)
    }



    async deleteById({ id }: { id: ID }) {
        const items = await this.createQueryBuilder()
            .where({ parentId: id })
            .getMany()
        if (items.length > 0) {
            let ids = items.reduce((str, item) => {
                str += item.id + ' '
                return str
            }, '')
            throw new ConflictException('Please remove all children of current category (' + ids + ')')
        }
        return await this.delete(id)
    }

}
