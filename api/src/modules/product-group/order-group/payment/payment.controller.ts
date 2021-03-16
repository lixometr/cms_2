import { Controller, Get, Post, Body, Put, Param, Delete, All, SerializeOptions } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetRequestPayload, RequestPayload, SerializeGroup } from 'src/internal';
import { PaymentIntegrationTypes } from './payment.types';
import { PaymentName } from './payment.constants';

@Controller('payment')
export class PaymentController {
  name = PaymentName
  constructor(private readonly paymentService: PaymentService) { }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('available')
  findAvailableDelivery(@GetRequestPayload() payload: RequestPayload) {
    return this.paymentService.getAvailable({}, payload)
  }


  @All('/type/:type/result')
  getPaymentResult(@Param('type') type: PaymentIntegrationTypes, @Body() data: any, @GetRequestPayload() payload: RequestPayload) {
    // receiving payment status webhook
    return this.paymentService.paymentResult({type, data}, payload)
    // here we change order status depend on data
  }


}
