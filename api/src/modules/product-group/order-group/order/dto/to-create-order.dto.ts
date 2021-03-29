import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateOrderProductDto, IdDto } from "src/internal";
import { CreateOrderInfoDto } from "./create-order-info.dto";
import { ToCreateOrderDeliveryDto } from "./to-create-order-delivery.dto";
import { ToCreateOrderPaymentTypeDto } from "./to-create-order-payment-type.dto";
import { ToCreateOrderProductDto } from "./to-create-order-product.dto";

export class ToCreateOrderDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ToCreateOrderProductDto)
    products: ToCreateOrderProductDto[]

    @IsOptional()
    @IsString()
    promocode: string

    @IsObject()
    @ValidateNested()
    @Type(() => ToCreateOrderDeliveryDto)
    delivery: ToCreateOrderDeliveryDto

    @IsObject()
    @ValidateNested()
    @Type(() => ToCreateOrderPaymentTypeDto)
    payment: ToCreateOrderPaymentTypeDto

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderInfoDto)
    info: CreateOrderInfoDto


}
