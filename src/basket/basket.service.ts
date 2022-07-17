import {Inject, Injectable} from '@nestjs/common';
import {
    AddToBasketResponse,
    GetTotalBasketPriceResponse,
    RemoveFromBasketResponse,
} from '../interfaces/basket';
import {ShopService} from '../shop/shop.service';
import {AddItemDto} from './dto/add-item.dto';
import {ItemInBasket} from "./item-in-basket.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class BasketService {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
        @Inject(UserService) private userService: UserService,
    ) {
    }


    async add(product: AddItemDto): Promise<AddToBasketResponse> {
        const {count, productId, userId} = product;

        const shopItem = await this.shopService.getOneItem(productId);


        if (
            typeof userId !== 'string'
            ||
            typeof productId !== 'string'
            ||
            typeof count !== 'number'
            ||
            productId === ''
            ||
            userId === ''
            ||
            count < 1
            ||
            !shopItem
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
