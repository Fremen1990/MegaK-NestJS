import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddToBasketResponse,
  GetBasketResponse, GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class BasketService {
  private items: AddItemDto[] = [];

  constructor(
    @Inject(forwardRef(()=>ShopService)) private shopService: ShopService,
  ) {
  }


  add(product: AddItemDto): AddToBasketResponse {
    const { count, name } = product;

    if (
      typeof name !== 'string'
      ||
      typeof count !== 'number'
      ||
      name === ''
      ||
      count < 1
      // ||
      // !this.shopService.hasItem(name)
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(product);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(number: number): RemoveFromBasketResponse {
    if (this.items[number]) {
      this.items.splice(number, 1);

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  getAll(): GetBasketResponse {
    return this.items;
  }

  getTotalPrice(): GetTotalBasketPriceResponse {
    return this.items.reduce((prev, curr) => (
      prev + this.shopService.getPrice(curr.name) * curr.count * 1.23
    ), 0);
  }

  countPromo(): number{
    return this.getTotalPrice()>10 ? 1 : 0
  }
}
