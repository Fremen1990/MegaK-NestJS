import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShopController} from './shop/shop.controller';
import {ShopService} from './shop/shop.service';
import {BasketController} from './basket/basket.controller';
import {BasketService} from './basket/basket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
    ],
    controllers: [AppController, ShopController, BasketController],
    providers: [AppService, ShopService, BasketService],
})
export class AppModule {
}