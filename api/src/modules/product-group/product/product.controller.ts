import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  Req,
  SerializeOptions,
  HttpCode,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { ControllerBlueprint } from 'src/blueprints/controller'
import { GetRequestPayload, ID, RequestPayload } from 'src/internal'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductFiltersResponse } from 'src/internal'
import { SerializeGroup } from 'src/types'
import { AuthAdmin } from 'src/internal'
import { ProductName } from './product.constants'
import { ProductInfoDto } from './dto/product-info.dto'

@Controller('product')
export class ProductController extends ControllerBlueprint {
  public name = ProductName
  constructor(private readonly productService: ProductService) {
    super(productService)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get()
  findAll(
    @GetRequestPayload() requestPayload: RequestPayload,
  ): Promise<ProductFiltersResponse> {
    return this.productService.findAllWithFilters({}, requestPayload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('id/:id/categories')
  findCategoriesById(
    @Param('id') id: ID,
    @GetRequestPayload() requestPayload: RequestPayload,
  ) {
    console.log('here')
    return this.productService.findCategoriesById({ id }, requestPayload)
  }

  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Admin] })
  @Post()
  async create(
    @Body() product: CreateProductDto,
    @GetRequestPayload() requestPayload: RequestPayload,
  ) {
    return super.create(product, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/similar-products')
  findSimilarProducts(
    @Param('id') id: ID,
    @GetRequestPayload() payload: RequestPayload,
  ) {
    return this.productService.findSimilarItems({ id }, payload)
  }

  @HttpCode(200)
  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Full] })
  @Post('id/:id/info')
  getPrice(
    @Param('id') id: ID,
    @Body() info: ProductInfoDto,
    @GetRequestPayload() payload: RequestPayload,
  ) {
    return this.productService.getItemInfo({ id, info }, payload)
  }
  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Admin] })
  @Get('id/:id/clone')
  async clone(
    @Param('id') id: ID,
    @GetRequestPayload() payload: RequestPayload,
  ) {
    return this.productService.clone({ id }, payload)
  }
  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Admin] })
  @Put('id/:id')
  update(@Param('id') id: ID, @Body() updateDto: UpdateProductDto) {
    return super.update(id, updateDto)
  }

  // @Get('filters')
  // async findWithFilters(@GetRequestPayload() requestPayload: RequestPayload) {
  //   return this.productService.findWithFilters({}, requestPayload)
  // }
}
