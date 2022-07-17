import {forwardRef, Module} from '@nestjs/common';
import {ShopModule} from "../shop/shop.module";
import {BasketService} from "./basket.service";
import {UserModule} from "../user/user.module";
import {BasketController} from "./basket.controller";

@Module({
    imports:[
        forwardRef(()=>ShopModule),
        forwardRef(()=>UserModule)
    ],
    controllers:[BasketController],
    providers:[BasketService],
    exports:[BasketService]
})
export class BasketModule {}
