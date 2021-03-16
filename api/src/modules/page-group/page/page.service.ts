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
  constructor(private pageRepository: PageRepository,
    private eventEmiter: EventEmitter2,
    private pageTemplateService: PageTemplateService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService) { super(pageRepository, eventEmiter); }
  async setupValues({ page }: { page: Page, }, payload: RequestPayload): Promise<Page> {
    const groups = payload.getGroups()
    if (groups.includes(SerializeGroup.Admin)) return page
    const template = await this.pageTemplateService.findById({ id: page.templateId }, payload)
    await page.serialize(payload)
    delete page.locale
    const setuper = (field: PageTemplateField, path = 'values') => {
      if (path) {
        path += `.${field.varName}`
      } else {
        path = `${field.varName}`
      }
      const currentValue = _.get(page, path)
      if (field.type === 'text') {
      }
      if (field.type === 'block') {
        field.settings.fields.map((f: PageTemplateField) => {
          setuper(f, path)
        })
      }
    }
    template.fields.map((field) => setuper(field))
    return page
  }
  async findBySlug({ slug }: { slug: string }, payload: RequestPayload) {
    let page = await super.findBySlug({ slug }, payload)
    page = await this.setupValues({ page }, payload)
    return page
  }
  async findById({ id }: { id: ID }, payload: RequestPayload) {
    let page = await super.findById({ id }, payload)
    page = await this.setupValues({ page }, payload)
    return page
  }
}
