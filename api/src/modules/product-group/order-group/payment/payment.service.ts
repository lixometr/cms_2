import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ObjectResponse } from 'src/helpers/response/object.response';
import { RequestPayload } from 'src/internal';
import { SettingsNames } from 'src/internal';
import { SettingsService } from 'src/modules/settings/settings.service';

import { PaymentName } from './payment.constants';
import { PaymentIntegrationTypes, PaymentTypes } from './payment.types';
import { PaymentContext } from './strategies/payment-context';

@Injectable()
export class PaymentService {
    name = PaymentName
    constructor(private eventEmiter: EventEmitter2, private settingsSerivce: SettingsService) { }
    async paymentResult({ type, data }: { type: PaymentIntegrationTypes, data: any }, payload: RequestPayload) {
        const paymentStrategy = new PaymentContext(type)
        return paymentStrategy.onResult({ data }, payload)
    }

    async getAvailable({ }, payload: RequestPayload) {
        const useCash = await this.settingsSerivce.findBySlug({ internal: true, slug: SettingsNames.useCash }, payload)
        const useInvoice = await this.settingsSerivce.findBySlug({ internal: true, slug: SettingsNames.useInvoice }, payload)
        const toSend = {
            [PaymentTypes.cash]: !!useCash?.value,
            [PaymentTypes.invoice]: !!useInvoice?.value,
            [PaymentTypes.integration]: {}
        }
        return new ObjectResponse(toSend)
    }
    getContext({ strategy }: { strategy: string }, payload: RequestPayload) {
        return new PaymentContext(strategy)
    }
}
