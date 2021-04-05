

import { Type } from "class-transformer";
import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Image } from "src/modules/upload-group/image";
import { WidgetModelDto } from "../widget.model.dto";
class SocIcon {
    @IsString()
    link: string
    @IsObject()
    icon: any
}
class WidgetFooterValues {
   

    @IsString()
    phone: string

    @IsString()
    copyright: string

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => SocIcon)
    socIcons: SocIcon
}
export class WidgetFooterDto extends WidgetModelDto {
    @IsObject()
    @ValidateNested()
    @Type(() => WidgetFooterValues)
    values: WidgetFooterValues
}