// mail.service.ts
import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from "process";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    async sendMail() {
        try {
            await this.mailerService.sendMail({
                to: 'kuhj1539@naver.com',
                from: process.env.MAIL_USER,
                subject: 'Hello',
                text: 'Hello World',
                html: '<b>Hello World</b>',
            });
            console.log('메일이 전송되었습니다')
        } catch (error) {
            console.error('메일 전송 중 오류가 발생했습니다:', error);
        }
    }
}