import { EntityDefaultBlueprint } from "src/blueprints";
import { DELETE_OPTIONS } from "src/constants";
import { ID } from "src/types";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderInfo {

    @PrimaryGeneratedColumn()
    id: ID

    @Column()
    name: string
    @Column()
    surname: string
    @Column({ nullable: true })
    city: string
    @Column({ nullable: true })
    index: string
    @Column({ nullable: true })
    address: string
    @Column()
    house: string
    @Column()
    phone: string
    @Column()
    email: string
    @Column({ nullable: true })
    comment: string


    @OneToOne(() => Order, order => order.info, DELETE_OPTIONS)
    order: Order

}