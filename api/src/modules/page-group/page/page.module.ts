import { forwardRef, Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './repository/page.repository';
import { PageListenerService } from './page.listener';
import { PageTemplateModule } from '../page-template/page-template.module';
import { Page } from './entities/page.entity';
import { ProductModule } from 'src/modules/product-group/product/product.module';
import { ProductCategoryModule } from 'src/modules/product-group/product-category/product-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([PageRepository]), forwardRef(() => PageTemplateModule),  forwardRef(() => ProductModule), forwardRef(() => ProductCategoryModule)],
  controllers: [PageController],
  providers: [PageService, PageListenerService],
  exports: [PageService]
})
export class PageModule {}
