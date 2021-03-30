import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import {  SendFormDto } from './dto/send-form.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { FormName } from './form.constants';
import { FormService } from './form.service';
import { GetRequestPayload } from 'src/decorators';
import { RequestPayload } from 'src/helpers';

@Controller('form')
export class FormController {
  public name = FormName
  constructor(private readonly formService: FormService) { }

  @Post('send')
  async sendForm(@Body() data: SendFormDto, @GetRequestPayload() payload: RequestPayload) {
    return this.formService.sendForm({ data }, payload)
  }
}
