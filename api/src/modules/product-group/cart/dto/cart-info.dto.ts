import { Type } from "class-transformer";
import { IsArray, IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, IdDto } from "src/internal";
import { CartProductActiveOptions, CartProductDto } from "./cart-product.dto";

export class CartInfoProductDto {
    @IsObject()
    @Type(() => IdDto)
    product: IdDto

    @IsObject()
    @Type(() => CartProductActiveOptions)
    activeOptions: CartProductActiveOptions

    @IsInt()
    cnt: number

    @IsOptional()
    @IsInt()
    activeVariation: ID
}

export class CartInfoDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CartInfoProductDto)
    products: CartInfoProductDto[]

    @IsOptional()
    @IsString()
    promocode: string
}