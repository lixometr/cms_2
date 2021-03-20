import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateMenuItemDto } from "./create-menu-item.dto";
import { LocaleMenuDto } from "./locale-menu.dto";

export class CreateMenuDto {
    
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleMenuDto)
    locale: LocaleMenuDto[]
  
    @IsOptional()
    @IsInt()
    sortOrder: number
 
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateMenuItemDto)
    items: CreateMenuItemDto[]
}
