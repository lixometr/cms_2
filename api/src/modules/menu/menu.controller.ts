import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, SerializeGroup } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { MenuName } from './menu.constants';

@Controller('menu')
export class MenuController extends ControllerBlueprint {
  public name = MenuName
  constructor(private readonly menuService: MenuService) { super(menuService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  // @AuthAdmin()
  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.menuService.create({ data: createMenuDto }, requestPayload);
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  // @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateMenuDto: UpdateMenuDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return this.menuService.updateById({ id, data: updateMenuDto }, requestPayload);
  }

}
