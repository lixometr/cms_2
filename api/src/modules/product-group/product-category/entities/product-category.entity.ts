import { Injectable } from "@nestjs/common";
import { Expose } from "class-transformer";
import { CASCADE_NOT_INSERT } from "src/constants";
import { Attribute, EntityLocaleItemBlueprint, EntitySeo, Product, ProductCategoryLocale, SerializeGroup } from "src/internal";
import { ID } from "src/internal";
import { Image } from "src/modules/upload-group/image";
import { AfterLoad, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { ProductCategorySoon } from "./product-category-soon.entity";
import { getCustomRepository } from "typeorm";
import { ProductCategoryRepository } from "../index";
import { PageRepository } from "src/modules/page-group/page/repository/page.repository";
import { RequestPayload } from "src/helpers";
@Entity()
@Tree("materialized-path")
export class ProductCategory extends EntityLocaleItemBlueprint {

    @TreeChildren({ cascade: true})
    children: ProductCategory[];

    @Column({ nullable: true, })
    parentId: ID;

    @TreeParent()
    parent: ProductCategory;

    @ManyToMany(() => Product, product => product.category)
    products: Product[]

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => ProductCategoryLocale, catLocale => catLocale.item, { cascade: true, eager: true })
    locale: ProductCategoryLocale[];
    name: string;
    title: string;
    seo: EntitySeo;
    textTop: string;
    textBottom: string;

    @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full] })
    @ManyToMany(() => Attribute, { cascade: CASCADE_NOT_INSERT, eager: true, })
    @JoinTable()
    availableFilterAttributes: Attribute[]

    @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full] })
    @Column({ default: false })
    showFilterPrice: boolean

    @ManyToOne(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, onDelete: 'SET NULL', nullable: true })
    image: Image

    @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full, SerializeGroup.Info] })
    fullSlug?: string

    @Column(type => ProductCategorySoon)
    soon: ProductCategorySoon

    async makeFullSlug(payload: RequestPayload) {
        const categoryRepository = getCustomRepository(ProductCategoryRepository)
        const slugs = []
        const make = async (item: ProductCategory) => {
            slugs.unshift(item.slug)
            if (typeof item.parentId === 'number') {
                const parent = await categoryRepository.findById({ id: this.parentId }, payload)
                if (parent) {
                    await make(parent)
                }
            }
        }
        await make(this)
        let fullSlug = slugs.join('/')
        this.fullSlug = fullSlug

    }
    async serialize(payload: RequestPayload) {
    
        await this.makeFullSlug(payload)
        return super.serialize(payload)
    }


}
