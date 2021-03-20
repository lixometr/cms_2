import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './repository/menu.repository';
import { MenuListenerService } from './menu.listener';
import { MenuItemRepository } from './repository/menu-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository, MenuItemRepository])],
  controllers: [MenuController],
  providers: [MenuService, MenuListenerService],
  exports: [MenuService]
})
export class MenuModule {}
