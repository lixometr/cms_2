import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

}
