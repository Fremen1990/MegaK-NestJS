import { AddItemDto } from '../basket/dto/add-item.dto';

export type AddToBasketResponse = {
  isSuccess: true;
  index: number;
} | {
  isSuccess: false;
}

export interface RemoveFromBasketResponse {
  isSuccess: boolean;
}

export type GetBasketResponse = AddItemDto[];

export type GetTotalBasketPriceResponse = number;