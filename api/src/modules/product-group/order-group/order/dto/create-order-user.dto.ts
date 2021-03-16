import { Exclude } from "class-transformer";
import { Allow, IsInt, IsOptional, IsString } from "class-validator";
import { ID } from "src/internal";

export class CreateOrderUserDto {

    @IsInt()
    id: ID

    @IsOptional()
    @IsString()
    firstName: string

    @IsString()
    email: string;

    // @Allow()
    // role: any
}