import { DELETE_OPTIONS } from "src/constants";
import { ID, Product } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariation } from "../../product-variation";

@Entity()
export class ProductVariationCntSale  {
    @PrimaryGeneratedColumn()
    id: ID

    @ManyToOne(() => ProductVariation, product => product.cntSale, DELETE_OPTIONS)
    item: Product

    @Column()
    sale: number

    @Column()
    cnt: number
}