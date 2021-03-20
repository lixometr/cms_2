import { DefaultTreeRepository } from 'src/blueprints/tree.repository';
import { RequestPayload } from 'src/helpers';
import { ArrayResponse, DefaultRepository, ID, SLUG } from 'src/internal';
import {  EntityManager, EntityRepository, Repository, Transaction, TreeRepository } from 'typeorm';
import { MenuItem } from '../index';
import { MenuItemName } from '../menu.constants';
@EntityRepository(MenuItem)
export class MenuItemRepository extends DefaultTreeRepository<MenuItem> {
    public treeRepository: TreeRepository<MenuItem>
    public name = MenuItemName
    constructor(public manager: EntityManager) {
        super(manager, MenuItem)
    }
 
   
}
