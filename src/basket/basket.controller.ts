import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';
import { BasketService } from './basket.service';
import { AddItemDto } from './dto/add-item.dto';

@Controller('basket')
export class BasketController {

  constructor(
    @Inject(BasketService) private basketService: BasketService,
  ) {
  }

  @Post('/')
  addProductToBasket(
    @Body() product: AddItemDto,
  ): AddToBasketResponse {
    return this.basketService.add(product);
  }

  @Delete('/:index')
  removeProduct(
    @Param('index') index: string,
  ): RemoveFromBasketResponse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  getBasket(): GetBasketResponse {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalBasketPrice(): GetTotalBasketPriceResponse {
    return this.basketService.getTotalPrice();
  }

}
