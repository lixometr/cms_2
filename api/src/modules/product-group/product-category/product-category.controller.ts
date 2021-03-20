import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Req, SerializeOptions } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, SerializeGroup, SLUG } from 'src/internal';
import { ProductService } from '../product/product.service';
import { AppRequest, NoAuthRequest } from 'src/internal';
import { RequestPayload } from 'src/helpers';
import { ProductCategoryName } from './product-category.constants';

@Controller('category')
export class ProductCategoryController extends ControllerBlueprint {
  public name = ProductCategoryName
  constructor(private readonly itemService: ProductCategoryService,
    private productService: ProductService
  ) { super(itemService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreateProductCategoryDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.create({ data }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id', new ParseIntPipe()) id: ID, @Body() data: UpdateProductCategoryDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.update(id, data, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Full] })
  @Get('fullslug/*')
  findByFullSlug(@Param() slug: SLUG, @GetRequestPayload() payload: RequestPayload) {
    return this.itemService.findByFullSlug({ slug: slug['0'] }, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('/tree')
  findTrees(@GetRequestPayload() payload: RequestPayload) {
    return this.itemService.findTrees({}, payload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/breadcrumbs')
  findBreadcrumbs(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.findBreadcrumbsById({ id }, requestPayload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/children')
  findChildren(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.findChildrenById({ id }, requestPayload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/children-tree')
  findChildrenTree(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.findChildrenTreeById({ id }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/parents')
  findParents(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.findParentsById({ id }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/parents-tree')
  findParentsTree(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.itemService.findParentsTreeById({ id }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('id/:id/products')
  findProductsById(@Param('id', new ParseIntPipe()) id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.productService.findByCategoryId({ id }, requestPayload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
  @Get('fullslug/*/products')
  findProductsBySlug(@Param() slug: SLUG, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.productService.findByCategoryFullSlug({ slug: slug['0']  }, requestPayload)
  }

}
