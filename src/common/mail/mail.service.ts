// mail.service.ts
import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from "process";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    async sendMail(vrfctCode: number, email: string) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: process.env.MAIL_USER,
                subject: '회원가입 승인코드',
                text: `${vrfctCode}`,
                html: '<b>' + vrfctCode + '</b>',
            });
            console.log('메일이 전송되었습니다')
        } catch (error) {
            console.error('메일 전송 중 오류가 발생했습니다:', error);
        }
    }
}