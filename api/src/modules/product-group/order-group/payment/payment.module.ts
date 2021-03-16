import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { GenerateInvoiceService } from './generate-invoice.service';
import { PaymentInvoiceStrategy } from './strategies/payment-invoice.strategy';
import { PaymentStrategy } from './strategies/payment.strategy';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentStrategy, GenerateInvoiceService, PaymentInvoiceStrategy],
  exports: [PaymentService, PaymentStrategy, ]
})
export class PaymentModule { }
