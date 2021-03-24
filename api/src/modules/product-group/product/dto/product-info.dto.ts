import { IsNumber, IsObject } from "class-validator";
import { ID } from "src/internal";
import { ProductActiveOptions } from "../product.types";

export class ProductInfoDto {
    @IsNumber()
    activeVariation: ID
    @IsObject()
    activeOptions: ProductActiveOptions
    @IsNumber()
    cnt?: number
}