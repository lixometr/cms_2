import { EntityBase } from "src/blueprints"
import { EntitySeo, ID } from "src/internal"
import { Image } from "src/modules/upload-group/image"
import { CartProductActiveOptions } from "../../cart"
import { ProductOption } from "../../product-option"
export type ProductInfoProps = {
    name: string
    slug: string

    price: number
    oldPrice: number
    sale: number


    description: any
    seo: EntitySeo;

    defaultImage: Image

    images: Image[]

    totalPrice: number
    optionsPrice: number

    cnt: number

    activeOptions: CartProductActiveOptions
    activeVariation: ID


}
export class ProductInfo extends EntityBase {
    name: string
    slug: string

    price: number
    oldPrice: number
    sale: number

    totalPrice: number

    description: any
    seo: EntitySeo;

    defaultImage: Image

    images: Image


    activeOptions: CartProductActiveOptions
    activeVariation: ID

    constructor(item: ProductInfoProps) {
        super()
        Object.assign(this, item)
    }
}