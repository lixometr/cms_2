import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { Menu } from './entities/menu.entity';
import { MenuName } from './menu.constants';
import { MenuRepository } from './repository/menu.repository';

@Injectable()
export class MenuService extends ServiceBlueprint<Menu>{
  public name = MenuName
  constructor(private menuRepository: MenuRepository, private eventEmiter: EventEmitter2) { super(menuRepository, eventEmiter) }
 
}
