import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { MenuName } from '../menu.constants';

@EntityRepository(Menu)
export class MenuRepository extends DefaultRepository<Menu> {
    public name = MenuName


}
