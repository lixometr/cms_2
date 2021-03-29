import { IsInt, IsString } from "class-validator";
import { ID } from "src/internal";

export class ToCreateOrderPaymentTypeDto {
 
    @IsString()
    type: string
}