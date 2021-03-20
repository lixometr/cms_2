import { Expose } from 'class-transformer';
import { EntityLocaleItemBlueprint,  SerializeGroup } from 'src/internal';
import { Product } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { MenuLocale } from './menu.tr.entity';

@Entity()
export class Menu extends EntityLocaleItemBlueprint {
   
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => MenuLocale, MenuLocale => MenuLocale.item, { cascade: true, eager: true })
    locale: MenuLocale[];

    @OneToMany(() => MenuItem, menuItem => menuItem.item, {cascade: true, eager: true})
    items: MenuItem[]
 
}
