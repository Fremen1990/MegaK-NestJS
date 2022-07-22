import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { CacheModule } from './cache/cache.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import {ConsoleModule} from "nestjs-console";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        ShopModule,
        BasketModule,
        CacheModule,
        DiscountCodeModule,
        CronModule,
        MailModule,
        AuthModule,
        ConsoleModule
    ],
    controllers: [AppController],
    providers: [AppService, CronService],
})
export class AppModule {
}

