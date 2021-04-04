import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { GenerateInvoiceService } from './generate-invoice.service';
import { PaymentInvoiceStrategy } from './strategies/payment-invoice.strategy';
import { PaymentStrategy } from './strategies/payment.strategy';
import { WidgetModule } from 'src/modules/widget/widget.module';

@Module({
  imports: [WidgetModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentStrategy, GenerateInvoiceService, PaymentInvoiceStrategy],
  exports: [PaymentService, PaymentStrategy, ]
})
export class PaymentModule { }
