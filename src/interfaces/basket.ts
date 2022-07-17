
export type AddToBasketResponse = {
  isSuccess: true;
  id: string;
} | {
  isSuccess: false;
}

export interface RemoveFromBasketResponse {
  isSuccess: boolean;
}

export interface OneItemInBasket{
  id:string,
  count:number
}



export type GetBasketResponse = OneItemInBasket[];

export type GetTotalBasketPriceResponse = number;

export type GetBasketStatsResponse = {
  itemInBasketAvgPrice:number;
  basketAvgTotalPrice:number
}