import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntityTranslationBlueprint } from "src/internal";
import { ID } from "src/internal";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity({})
export class MenuLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Menu, menu => menu.locale, LOCALE_REL_OPTIONS)
    item: Menu;

    @Column()
    name: string;
}
