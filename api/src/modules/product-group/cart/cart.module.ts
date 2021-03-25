import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
