import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module';
import { PromocodeModule } from '../promocode/promocode.module';

@Module({
  imports: [forwardRef(() => ProductModule), forwardRef(() => PromocodeModule)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
