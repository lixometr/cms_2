

import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { Image } from "src/modules/upload-group/image";
import { WidgetModelDto } from "../widget.model.dto";
class WidgetFooterValues {
   

    @IsString()
    phone: string

    @IsString()
    copyright: string

}
export class WidgetFooterDto extends WidgetModelDto {
    @IsObject()
    @ValidateNested()
    @Type(() => WidgetFooterValues)
    values: WidgetFooterValues
}