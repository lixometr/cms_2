import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { join, resolve } from "path";
import { RequestPayload, SettingsNames } from "src/internal";
import { SettingsService } from "../settings/settings.service";
import * as nodemailer from "nodemailer"
import * as fs from "fs"
import * as path from "path"
import * as _ from "lodash";
import { AppConfig } from "src/config";
interface SendProps {
    html: string
    subject?: string
    from?: string

}
interface SendOne extends SendProps {
    to?: string
}
interface SendMany extends SendProps {
    to: [
        {
            name?: string,
            email: string
        },
    ],
}
@Injectable()
export class MailService {
    public sender: any
    private fromEmail: string
    constructor(private settingsService: SettingsService) { }
    async init({ }, payload: RequestPayload) {
        this.fromEmail = 'noreply@st-cms.ru'
        this.sender = nodemailer.createTransport({
            port: 465,
            host: 'smtp.yandex.ru',
            secure: true,
            auth: {
                user: "noreply@st-cms.ru",
                pass: "H*Uagscd67aAUygsc23"
            }
        })
    }
    async send(mail: SendOne, payload: RequestPayload) {
        await this.init({}, payload)
        const toSend = { ...mail, subject: 'Новая заявка с сайта', to: mail.to, }
        if (!toSend.from) {
            toSend.from = this.fromEmail
        }
        if (!toSend.to) {
            toSend.to = AppConfig.get<string>('adminEmail')
        }
        return new Promise((resolve, reject) => {
            this.sender.sendMail(toSend, (error, info) => {
                if (error) {
                    console.log(error.message);
                    reject(error)
                }
                console.log('Message sent: %s', info.messageId);
                resolve(info)
            });
        })
    }
    async sendTemplate({ name, data, mail }: { name: string, mail?: SendOne, data: any }, payload: RequestPayload) {
        const filename = `${name}.html`
        const temlatePath = path.join(__dirname, '..', '..', '..', 'assets', 'templates', filename)
        const templateData = await new Promise<string>((resolve, reject) => {
            fs.readFile(temlatePath, 'utf-8', (error, data) => {
                if (error) return reject(error)
                data = Buffer.from(data).toString()
                resolve(data)
            })
        })
        const compile = _.template(templateData)
        const html = compile(data)
        const toSend = {
            html,
            ...mail
        }
        this.send(toSend, payload)
    }
    call(method: string, ...args: any) {
        return this.sender[method](...args)
    }
}