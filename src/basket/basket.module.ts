import {forwardRef, Module} from '@nestjs/common';
import {ShopModule} from "../shop/shop.module";
import {ShopController} from "../shop/shop.controller";
import {ShopService} from "../shop/shop.service";
import {BasketService} from "./basket.service";
import {UserModule} from "../user/user.module";

@Module({
    imports:[
        forwardRef(()=>ShopModule),
        forwardRef(()=>UserModule)
    ],
    controllers:[ShopController],
    providers:[ShopService],
    // exports:[BasketService]
})
export class BasketModule {}
