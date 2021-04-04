import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { EventEmitter2 } from "eventemitter2";
import { RequestPayload } from "src/helpers";
import { WidgetRepository } from "src/modules/widget/repositories/widget.repository";
import { WidgetModels } from "src/modules/widget/widget.constants";
import { WidgetService } from "src/modules/widget/widget.service";
import { getCustomRepository } from "typeorm";
import { GenerateInvoiceService } from "../generate-invoice.service";
import { PaymentService } from "../payment.service";
import { PaymentTypes } from "../payment.types";
import { PaymentStrategy } from "./payment.strategy";
@Injectable()
export class PaymentInvoiceStrategy extends PaymentStrategy {
    public name = PaymentTypes.invoice
    constructor(public paymentService: PaymentService, public eventEmiter: EventEmitter2, public moduleRef: ModuleRef,) { super(paymentService, eventEmiter) }
    async toResponse({ order }, payload: RequestPayload) {
        const generateInvoice = new GenerateInvoiceService()
        const widgetRepositry = getCustomRepository(WidgetRepository)
        const invoiceWidget = await widgetRepositry.findBySlug({ slug: 'invoice' }, payload)
        await invoiceWidget.serialize(payload)
        generateInvoice.generate({ order, info: invoiceWidget.values})
        .then(() => {
            // send mail
        })
        return { ok: true }
    }
}