import { IsEnum, IsString } from "class-validator";
import { OrderStatus } from "../order.types";

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus
}