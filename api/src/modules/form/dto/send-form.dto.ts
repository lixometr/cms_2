import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendFormDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    phone: string


}
