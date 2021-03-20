import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ID, RequestPayload } from 'src/internal';
import { ProductService } from 'src/modules/product-group/product/product.service';
import { PageTemplate } from 'src/internal';
import { PageTemplateService } from '../page-template/page-template.service';
import { Page } from './entities/page.entity';
import { PageName } from './page.constants';
import { PageRepository } from './repository/page.repository';
import * as _ from 'lodash';
import { ProductCategoryService } from 'src/modules/product-group/product-category/product-category.service';
import { PageTemplateField } from 'src/internal';
import { SerializeGroup } from 'src/internal';

@Injectable()
export class PageService extends ServiceBlueprint<Page>{
  public name = PageName
  constructor(private pageRepository: PageRepository,  private eventEmiter: EventEmitter2) { super(pageRepository, eventEmiter); }


}
