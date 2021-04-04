import { IsString } from "class-validator";

export class CheckPromocodeDto {
    @IsString()
    promocode: string
}