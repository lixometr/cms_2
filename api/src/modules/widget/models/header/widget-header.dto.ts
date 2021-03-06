import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { Image } from "src/modules/upload-group/image";
import { WidgetModelDto } from "../widget.model.dto";
class WidgetHeaderValues {
    @IsObject()
    @Type(() => Image)
    logo: Image

    @IsString()
    phone: string

}
export class WidgetHeaderDto extends WidgetModelDto {
    @IsObject()
    @ValidateNested()
    @Type(() => WidgetHeaderValues)
    values: WidgetHeaderValues
}