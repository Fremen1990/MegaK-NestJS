import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        ShopModule,
        BasketModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}