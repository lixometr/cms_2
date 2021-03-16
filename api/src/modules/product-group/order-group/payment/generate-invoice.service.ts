import { Injectable } from "@nestjs/common";
import { Order } from "src/internal";
import * as pdf from "html-pdf"
import { join } from "path";
import * as fs from "fs"
const invoiceTemplatePath = join(__dirname, '..', '..', '..', '..', '..', 'assets', 'invoice-template', 'index.html')
const outputDir = 'invoice.pdf'
export class GenerateInvoiceService {
    async generate({ order }: { order: Order }) {
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
            content: html,
            
        };
        try {
            const bufer = await pdf.generatePdf(document, options)
            console.log(bufer)
        } catch (err) {
            console.log('error while creating invoice', err)
        }


    }
}