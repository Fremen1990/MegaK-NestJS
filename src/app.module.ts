import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShopController} from './shop/shop.controller';
import {ShopService} from './shop/shop.service';
import {BasketController} from './basket/basket.controller';
import {BasketService} from './basket/basket.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
    ],
    controllers: [AppController, ShopController, BasketController],
    providers: [AppService, ShopService, BasketService],
})
export class AppModule {
}