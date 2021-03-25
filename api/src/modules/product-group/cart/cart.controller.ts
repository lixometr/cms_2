import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Req, SerializeOptions } from '@nestjs/common';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, SerializeGroup, SLUG } from 'src/internal';
import { ProductService } from '../product/product.service';
import { AppRequest, NoAuthRequest } from 'src/internal';
import { RequestPayload } from 'src/helpers';
import { CartName } from './cart.constants';
import { CartInfoDto } from './dto/cart-info.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    public name = CartName
    constructor(private readonly itemService: CartService) { }


    @SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Full] })
    @Post('info')
    getInfo(@Body() infoDto: CartInfoDto, @GetRequestPayload() requestPayload: RequestPayload) {
        return this.itemService.getInfo({ info: infoDto }, requestPayload)
    }


}
