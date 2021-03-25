import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CartBo, RequestPayload } from 'src/internal';
import { ProductInfo } from '../product/entities/product-info.entity';
import { ProductService } from '../product/product.service';
import { PromocodeService } from '../promocode/promocode.service';
import { CartName } from './cart.constants';
import { CartInfoDto } from './dto/cart-info.dto';
import { CartInfo } from './entities/cart-info.entity';

@Injectable()
export class CartService {
  public name = CartName
  constructor(private productService: ProductService, private promocodeService: PromocodeService) { }
  async getInfo({ info }: { info: CartInfoDto }, payload: RequestPayload) {
    const resolvers = info.products.map(async cartProduct => {
      const product = await this.productService.findById(cartProduct.product, payload)
      if (!product) return null
      await product.serialize(payload)
      return {
        ...cartProduct,
        product
      }
    })
    let cartProducts = await Promise.all(resolvers)
    cartProducts = cartProducts.filter(item => !!item)
    const promocode = await this.promocodeService.findByName({name: info.promocode}, payload)
    const cartBo = new CartBo({ products: cartProducts, promocode })
    const cartInfo = {
      totalPrice: cartBo.getTotalPrice(),
      promocodeSale: cartBo.getPromocodeSale(),
      products: []
    }
    const productInfosResolvers = cartProducts.map(async (cartProduct) => {
      const productInfo = await this.productService.getItemInfo({
        id: cartProduct.product.id, 
        info: {
          activeOptions: cartProduct.activeOptions,
          activeVariation: cartProduct.activeVariation,
          cnt: cartProduct.cnt
        }
      }, payload)
      return productInfo
    })
    const productInfos = await Promise.all(productInfosResolvers)
    cartInfo.products = productInfos
    return new CartInfo(cartInfo)

  }
}
