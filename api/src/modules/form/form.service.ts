import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestPayload } from 'src/helpers';
import { MailService } from '../mail/mail.service';
import { SendFormDto } from './dto/send-form.dto';

import { FormName } from './form.constants';
import { SecuredSettings, SettingsNames } from './form.types';
@Injectable()
export class FormService {
  public name = FormName
  constructor(private eventEmiter: EventEmitter2, private mailService: MailService) { }

  async sendForm({ data }: { data: SendFormDto }, payload: RequestPayload) {
    return await this.mailService.sendTemplate({ name: 'form', data }, payload)
  }

}
