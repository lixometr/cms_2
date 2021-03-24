import { ConflictException } from '@nestjs/common';
import { RequestPayload } from 'src/helpers';
import { ArrayResponse, DefaultRepository, ID, SLUG } from 'src/internal';
import { DeleteResult, EntityManager, EntityRepository, Repository, Transaction, TreeRepository } from 'typeorm';
import { EntityBase } from './base.entity';
import { EntityDefaultBlueprint } from './default.entity';

export class DefaultTreeRepository<T extends EntityDefaultBlueprint> extends DefaultRepository<T> {
    public treeRepository: TreeRepository<T>
    constructor(public manager: EntityManager, public itemEntity) {
        super()
        this.treeRepository = this.manager.getTreeRepository(itemEntity)

    }
    async findBySlug({ slug, parentId }: { slug: SLUG, parentId?: ID }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
            .where(`${this.name}.slug = :slug`, { slug })
        if (parentId !== undefined) {
            query.andWhere(`${this.name}.parentId = :parentId`, { parentId })
        }
        return await this.findOneWithRestrictions(query, payload)
    }

    async findTrees({ }, payload: RequestPayload) {
        const items = await this.treeRepository.findTrees()
        return new ArrayResponse(items)
    }
    async findRoots() {
        const items = await this.treeRepository.findRoots()
        return new ArrayResponse(items)
    }
    async findChildren(item: T, payload: RequestPayload) {
        const query = this.treeRepository.createDescendantsQueryBuilder(this.name, `${this.name}Closure`, item)
        this.populate(query, payload)
        this.restrictions(query, payload)
        return query.getMany()
    }
    async findChildrenById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        let items = await this.findChildren(item, payload)
        items = items.filter(item => item.id !== id)
        return new ArrayResponse(items)
    }

    async findChildrenTree(item: T) {
        return await this.treeRepository.findDescendantsTree(item)
    }
    async findChildrenTreeById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        return await this.findChildrenTree(item)
    }
    async findParents(item: T, payload: RequestPayload) {
        const query = this.treeRepository.createAncestorsQueryBuilder(this.name, `${this.name}Closure`, item)
        this.populate(query, payload)
        this.restrictions(query, payload)
        const items = await query.getMany()
        items.push(items[0])
        items.shift()
        items.sort((a: any, b: any) => {
            if(a.id === b.parentId) {
                return -1
            }
            if(a.parentId === b.id) {
                return 1
            }
            return 0
        })
        return items
    }
    async findParentsById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        let items = await this.findParents(item, payload)
        // items = items.reverse()
       
        const Response = new ArrayResponse(items)
        await Response.changeItems(items => items.filter(item => item.id !== id))
        return Response
    }
   
    async findParentsTree(item: T) {
        return await this.treeRepository.findAncestorsTree(item)
    }
    async findParentsTreeById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id }, payload)
        return await this.findParentsTree(item)
    }
    async countParents(item: T) {
        return await this.treeRepository.countAncestors(item)
    }
    async countParentsById({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id, }, payload)
        return await this.countParents(item)
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
            throw new ConflictException('Please remove all children of current item (' + ids + ')')
        }
        return await this.delete(id)
    }

}
