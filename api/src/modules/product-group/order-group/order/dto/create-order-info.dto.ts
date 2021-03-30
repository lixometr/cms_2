import { IsOptional, IsString } from "class-validator"

export class CreateOrderInfoDto {
    
    @IsString()
    name: string
    @IsString()
    surname: string
    @IsOptional()
    @IsString()
    city: string
    @IsString()
    @IsOptional()
    index: string
    @IsString()
    address: string
    @IsString()
    house: string
    @IsString()
    phone: string
    @IsString()
    email: string
    @IsOptional()
    @IsString()
    comment: string

}