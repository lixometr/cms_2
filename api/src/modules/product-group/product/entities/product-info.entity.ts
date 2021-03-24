import { EntityBase } from "src/blueprints"
import { EntitySeo } from "src/internal"
import { Image } from "src/modules/upload-group/image"
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


}
export class ProductInfo extends EntityBase{
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


    constructor(item: ProductInfoProps) {
        super()
        Object.assign(this, item)
    }
}