import { Controller, Get, Inject } from '@nestjs/common';
import {ShopItem} from "../interfaces/shop";
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {

    constructor(
      @Inject(ShopService) private shopService: ShopService,
    ) {
    }

    @Get('/')
        getShopList(): ShopItem[] {
        return this.shopService.getItems();
    }

}
