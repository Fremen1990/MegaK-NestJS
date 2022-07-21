import {Body, Controller, Delete, Get, Inject, Param, Post, UseInterceptors} from '@nestjs/common';
import {
    AddToBasketResponse,
    GetBasketResponse, GetBasketStatsResponse,
    GetTotalBasketPriceResponse,
    RemoveFromBasketResponse,
} from '../interfaces/basket';
import {BasketService} from './basket.service';
import {AddItemDto} from './dto/add-item.dto';
import {UseCacheTime} from "../decorators/use-cache-time.decorator";
import {MyCacheInterceptor} from "../interceptors/my-cashe.interceptor";
import {MyTimeoutInterceptor} from "../interceptors/my-timeout.interceptor";

@Controller('basket')
export class BasketController {

    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Post('/')
    addProductToBasket(
        @Body() product: AddItemDto,
    ): Promise<AddToBasketResponse> {
        return this.basketService.add(product);
    }

    @Delete('/all/:userId')
    clearBasket(
        @Param('userId') userId: string
    ) {
        this.basketService.clearBasket(userId);
    }

    @Delete('/:itemInBasketId/:userId')
    removeProduct(
        @Param('itemInBasketId') itemInBasketId: string,
        @Param('userId') userId: string,
    ): Promise<RemoveFromBasketResponse> {
        return this.basketService.remove(itemInBasketId, userId);
    }


    @Get('/admin')
    getBasketForAdmin(): Promise<GetBasketResponse> {
        return this.basketService.getAllForAdmin()
    }


    @Get('/stats')
    @UseInterceptors(/*MyTimeoutInterceptor,*/ MyCacheInterceptor)
    @UseCacheTime(60)
    getStats(): Promise<GetBasketStatsResponse> {
        return this.basketService.getStats();
        // new Promise( resolve => {()=>{}})


    }

    @Get('/:userId')
    getBasket(
        @Param('userId') userId: string
    ): Promise<GetBasketResponse> {
        return this.basketService.getAllForUser(userId);
    }

    @Get('/total-price/:userId')
    getTotalBasketPrice(
        @Param('userId') userId: string
    ): Promise<GetTotalBasketPriceResponse> {
        return this.basketService.getTotalPrice(userId);
    }


}
