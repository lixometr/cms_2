import { Controller, Get, Post, Body, Put, Param, Delete, Req, SerializeOptions, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { AuthAdmin, ID, NoAuthRequest, SerializeGroup } from 'src/internal';
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { ImportName } from './import.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { generateFilename } from '../upload-group/upload.helpers';
const multerParams: MulterOptions = {
  storage: diskStorage({
    destination: '/tmp',
    filename: generateFilename
  }),
  limits: {
  }

}
@Controller('import')
export class ImportController  {
  public name = ImportName
  constructor(private readonly importService: ImportService) { }

  
  @Post('')
  @UseInterceptors(FileInterceptor('file', multerParams))
  uploadImage(@UploadedFile() file,  @GetRequestPayload() requestPayload: RequestPayload) {
    if(!file) throw new BadRequestException()
    return this.importService.import({ file }, requestPayload)
  } 
 
}
