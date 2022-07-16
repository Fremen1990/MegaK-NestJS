import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopItem } from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class ShopService {


  constructor(@Inject(forwardRef(()=>BasketService)) private basketService: BasketService) {
  }

  getItems(): ShopItem[] {
    return [
      {
        name: 'Banan Afrykański',
        description: 'Super banan!',
        price: 5 - this.basketService.countPromo(),
      },
      {
        name: 'Banan Europejski',
        description: 'To takie istnieją?',
        price: 4 - this.basketService.countPromo(),
      },
      {
        name: 'Banan Zwyczajny',
        description: 'Niby zwyczajny, ale smaczny.',
        price: 4.5 ,
      },
    ];
  }

  hasItem(name: string): boolean {
    return this.getItems().some(item => item.name === name);
  }

  getPrice(name: string): number {
    return this.getItems().find(item => item.name === name).price;
  }
}
