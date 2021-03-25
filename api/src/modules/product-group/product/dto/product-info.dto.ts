import { IsNumber, IsObject, IsOptional } from "class-validator";
import { ID } from "src/internal";
import { ProductActiveOptions } from "../product.types";

export class ProductInfoDto {
    @IsOptional()
    @IsNumber()
    activeVariation: ID
    @IsObject()
    activeOptions: ProductActiveOptions
    @IsNumber()
    cnt?: number
}