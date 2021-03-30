import { forwardRef, Global, Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormListeners } from './form.listeners';
import { MailModule } from '../mail/mail.modules';

@Global()
@Module({
  imports: [forwardRef(() => MailModule)],
  controllers: [FormController],
  providers: [FormService, FormListeners],
  exports: [FormService]
})
export class FormModule { }
