import {Inject, Injectable} from '@nestjs/common';
import {
    AddToBasketResponse,
    GetBasketResponse,
    GetTotalBasketPriceResponse,
    RemoveFromBasketResponse,
} from '../interfaces/basket';
import {ShopService} from '../shop/shop.service';
import {AddItemDto} from './dto/add-item.dto';
import {ItemInBasket} from "./item-in-basket.entity";
import {ShopItem} from "../shop/shop-item.entity";

@Injectable()
export class BasketService {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }


    async add(product: AddItemDto): Promise<AddToBasketResponse> {
        const {count, id} = product;

        const shopItem = await this.shopService.getOneItem(id);

        if (
            typeof id !== 'string'
            ||
            typeof count !== 'number'
            ||
            id === ''
            ||
            count < 1
            ||
            !shopItem
            // !(await this.shopService.hasItem(id))
        ) {
            return {
                isSuccess: false,
            };
        }

        const item = new ItemInBasket();
        item.count = count;

        await item.save();

        item.shopItem = shopItem;

        await item.save();

        return {
            isSuccess: true,
            id: item.id,
        };
    }

    async remove(id: string): Promise<RemoveFromBasketResponse> {
        const item = await ItemInBasket.findOne(id);

        if (item) {
            await item.remove();

            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
        };
    }

    async getAll(): Promise<ItemInBasket[]> {
        return ItemInBasket.find({
            relations: ['shopItem'],
        });
    }

    async clearBasket() {
        await ItemInBasket.delete({});
    }

    async getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
        const items = await this.getAll();

        return (await Promise.all(items.map(async item => item.shopItem.price * item.count * 1.23)))
            .reduce((prev, curr) => prev + curr, 0);
    }
}
