import { IsString } from "class-validator"

export class CreateOrderInfoDto {
    
    @IsString()
    name: string
    @IsString()
    surname: string
    @IsString()
    city: string
    @IsString()
    index: string
    @IsString()
    address: string
    @IsString()
    house: string
    @IsString()
    phone: string
    @IsString()
    email: string
    @IsString()
    comment: string

}