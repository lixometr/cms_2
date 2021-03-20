import {  EntityTranslationBlueprint } from "src/blueprints";
import {  LOCALE_REL_OPTIONS } from "src/constants";
import { AfterLoad, AfterUpdate, Column, Entity, getCustomRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { MenuItem, MenuItemRepository } from "../index";

@Entity()
export class MenuItemLocale extends EntityTranslationBlueprint {
    @ManyToOne(() => MenuItem, item => item.locale, LOCALE_REL_OPTIONS)
    item: MenuItem;

    @Column()
    name: string

}