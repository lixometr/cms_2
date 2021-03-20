import { getCustomRepositoryToken } from "@nestjs/typeorm";
import { EntityDefaultBlueprint, EntityLocaleDefaultBlueprint } from "src/blueprints";
import { DELETE_OPTIONS } from "src/constants";
import { ID, RequestPayload, SerializeGroup } from "src/internal";
import { AfterInsert, AfterLoad, AfterUpdate, BeforeUpdate, Column, Entity, getCustomRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { MenuItemModelNames, MenuItemModels, MenuItemType } from "../menu.types";
import { MenuItemRepository } from "../index";
import { Menu } from "./menu.entity";
import { Expose } from "class-transformer";
import { MenuItemLocale } from "./menu-item.tr.entity";

@Entity()
@Tree("materialized-path")
export class MenuItem extends EntityLocaleDefaultBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => MenuItemLocale, menuItemLocale => menuItemLocale.item, { cascade: true, eager: true })
    locale: MenuItemLocale[];

    @TreeChildren({ cascade: true })
    children: MenuItem[];

    @Column({  ...DELETE_OPTIONS, nullable: true, })
    parentId: ID;

    @TreeParent()
    parent: MenuItem;

    @Column({nullable: true})
    itemId: ID

    @ManyToOne(() => Menu, menu => menu.items, {...DELETE_OPTIONS, nullable: true})
    item: Menu

    @Column()
    type: MenuItemType

    @Column({nullable: true})
    model: MenuItemModelNames

    @Column()
    value: string

    slug: string

  
    async makeUrl(payload: RequestPayload) {
        if (this.type === MenuItemType.model) {
            const repository = MenuItemModels[this.model]
            if(!repository) return
            const itemRepository = getCustomRepository<any>(repository)
            const id = parseInt(this.value)
            if(isNaN(id)) return
            const modelItem = await itemRepository.findById({id}, payload)
            if(!modelItem) return
            await modelItem.serialize(payload)
            let slug = ''
            if(this.model === MenuItemModelNames.category) {
                slug = modelItem.fullSlug
            } else {
                slug = modelItem.slug
            }
            this.slug = slug
        } else {
            this.slug = this.value
        }
    }
    async makeChildren (payload: RequestPayload) {
        const menuItemRep = getCustomRepository(MenuItemRepository)
        const children = await menuItemRep.findChildrenById({id: this.id}, payload)
        await children.serialize(payload)
        this.children = children.items
    }
    async serialize(payload: RequestPayload) {
        await this.makeUrl(payload)
        await this.makeChildren(payload)
        return super.serialize(payload)
    }

}