import { ID } from "src/internal";
import { ProductActiveOptions } from "../product.types";

export class ProductPriceInfoDto {
    activeVariation: ID
    activeOptions: ProductActiveOptions
    cnt?: number
}