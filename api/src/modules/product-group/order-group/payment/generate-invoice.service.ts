import { Injectable } from "@nestjs/common";
import { Order } from "src/internal";
import * as pdf from "pdf-creator-node"
import { join } from "path";
import * as fs from "fs"
import * as moment from "moment"
const invoiceTemplatePath = join(__dirname, '..', '..', '..', '..', '..', 'assets', 'invoice-template', 'index.html')
const outputDir = 'invoice.pdf'
export class GenerateInvoiceService {
    async generate({ order, info }: { order: Order, info: any }) {
        var html = fs.readFileSync(invoiceTemplatePath, "utf8");
    
        const options = {
            format: "A3",
            orientation: "portrait",
            border: "15mm",
            header: {
                height: "10mm",
            },
        }
        var document = {
            html: html,
            data: {
                ...order,
                ...info,
                invoiceDate: moment(order.createdAt).format('DD.MM.YYYY')
            },
            path: `./public/invoices/invoice-${order.orderId}.pdf`
        };
        try {
            const bufer = await pdf.create(document, options)
            console.log(bufer)
        } catch (err) {
            console.log('error while creating invoice', err)
        }


    }
}