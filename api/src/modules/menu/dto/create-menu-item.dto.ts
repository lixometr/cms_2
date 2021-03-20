import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { isArray } from "lodash";
import { ID } from "src/internal";
import { MenuItemModelNames, MenuItemType } from "../menu.types";
import { LocaleMenuItemDto } from "./locale-menu-item.dto";

export class CreateMenuItemDto {
    @IsOptional()
    id: ID

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleMenuItemDto)
    locale: LocaleMenuItemDto[]
  

    @ValidateIf((obj) => obj.type === MenuItemType.model)
    @IsEnum(MenuItemModelNames)
    model: MenuItemModelNames

    @IsString()
    value: string

    @IsOptional()
    @IsNumber()
    parentId: ID

    @IsOptional()
    @IsNumber()
    itemId: ID

    @IsEnum(MenuItemType)
    type: MenuItemType

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMenuItemDto)
    children: CreateMenuItemDto[]

    @IsOptional()
    @IsNumber()
    sortOrder: number
}
