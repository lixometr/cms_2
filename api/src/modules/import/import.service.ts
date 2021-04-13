import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResOk } from 'src/helpers';
import { RequestPayload } from 'src/internal';
import { ProductCategoryService } from '../product-group/product-category/product-category.service';
import { ProductService } from '../product-group/product/product.service';
import { CreateImportDto } from './dto/create-import.dto';
import { ImportName } from './import.constants';
import { ImportHelpersService } from './import.helpers';

@Injectable()
export class ImportService {
  public name = ImportName
  constructor(private eventEmiter: EventEmitter2,
    private importHelpers: ImportHelpersService) { }

  async import({ file }: CreateImportDto, payload: RequestPayload) {
    await this.importHelpers.importData(file.path, payload)
    return new ResOk()
  }
}
