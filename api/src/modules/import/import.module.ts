import { forwardRef, Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { ProductModule } from '../product-group/product/product.module';
import { ProductCategoryModule } from '../product-group/product-category/product-category.module';
import { ProductTagModule } from '../product-group/product-tag/product-tag.module';
import { ImageModule } from '../upload-group/image/image.module';
import { AttributeModule } from '../product-group/attribute/attribute.module';
import { AttributeValueModule } from '../product-group/attribute-value/attribute-value.module';
import { ImportHelpersService } from './import.helpers';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    forwardRef(() => ProductCategoryModule),
    forwardRef(() => ProductTagModule),
    forwardRef(() => ImageModule),
    forwardRef(() => AttributeModule),
    forwardRef(() => AttributeValueModule)
  ],
  controllers: [ImportController],
  providers: [ImportService, ImportHelpersService],
  exports: [ImportService]
})
export class ImportModule { }
