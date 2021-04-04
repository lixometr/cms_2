import { Type } from "class-transformer";
import { Allow, IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateImageDto, CreateProductOptionDto, CreateProductVariationDto, ID, IdDto, ProductCategory, ProductStatus, ProductType, ProductVariation } from "src/internal";
import { CreateProductCategoryDto } from "src/internal";
import { CreateCntSale } from "src/modules/product-group/product/dto/create-cnt-sale.dto";

export class CreateOrderProductItemDto {

    @IsInt()
    id: ID
    
    @IsString()
    name: string

    @IsString()
    slug: string;

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice: number

    @IsOptional()
    @IsNumber()
    sale: number

    @IsOptional()
    @IsArray()
    options: any

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateImageDto)
    defaultImage: CreateImageDto

    @Allow()
    status: ProductStatus;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProductCategoryDto)
    category: CreateProductCategoryDto[]

    @Allow()
    type: ProductType

    @IsOptional()
    @IsArray()
    variations: any

    @IsOptional()
    @IsString()
    sku: string;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateCntSale)
    cntSale: CreateCntSale[]

    @IsNumber()
    totalPrice: number
}
