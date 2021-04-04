import { EntityBase } from "src/blueprints";
import { ProductInfo } from "../../product/entities/product-info.entity";
import { CartProductDto } from "../dto/cart-product.dto";
interface CartInfoProps {
    totalPrice: number
    promocodeSale: number
    products: ProductInfo[]
    totalPriceNoSale: number

}
export class CartInfo extends EntityBase {
    totalPrice: number
    totalPriceNoSale: number
    promocodeSale: number
    products: ProductInfo[]
    constructor(item: CartInfoProps) {
        super()
        Object.assign(this, item)
    }
}