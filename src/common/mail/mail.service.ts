import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService} from '@nestjs-modules/mailer'
@Injectable()
export class MailService {
    constructor(private readonly mailerService: NestMailerService) {}

    async verification(email: string, subject: string, code : number) {
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: 'index',
            context: {
                code
            }
        })
    }
}
