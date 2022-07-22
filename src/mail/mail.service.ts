import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) {}


    async sendMail(to: string, subject: string, html: string): Promise<any> {

        try{
        await this.mailerService
            .sendMail({
                to,
                // from,
                subject,
                html
                // template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                // context: {
                //     // Data to be sent to template engine.
                //     code: 'cf1a3f828287',
                //     username: 'john doe',
                // },
            })
            console.log("Email sent successfully!!")

        }catch (error) {
            console.error("Send email failed")
        }


    }

}
