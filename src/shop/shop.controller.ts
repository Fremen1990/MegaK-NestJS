import {Controller, Get, Inject} from '@nestjs/common';
import {ShopItemInterface} from "../interfaces/shop";
import {ShopService} from './shop.service';

@Controller('shop')
export class ShopController {

    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }

    @Get('/')
    getShopList(): Promise<ShopItemInterface[]> {
        return this.shopService.getItems();
    }

}
