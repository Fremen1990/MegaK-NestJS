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
        const user = await this.userService.getOneUser(userId)

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
            ||
            !user
        ) {
            return {
                isSuccess: false,
            };
        }

        const item = new ItemInBasket();
        item.count = count;
        item.user = user;
        item.shopItem = shopItem;

        await item.save();

        return {
            isSuccess: true,
            id: item.id,
        };
    }

    async remove(itemInBasketId: string, userId:string): Promise<RemoveFromBasketResponse> {

        const user = await this.userService.getOneUser(userId)

        if(!user){
            throw new Error('User not found!')
        }

        const item = await ItemInBasket.findOne({
            where:{
                id: itemInBasketId,
                user
            }
        })


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

    async getAllForUser(userId:string): Promise<ItemInBasket[]> {

        const user = await this.userService.getOneUser(userId)

        if(!user){
            throw new Error('User not found!')
        }

        return ItemInBasket.find({
            where:{
              user:user,
            },
            relations: ['shopItem'],
        });
    }

    async getAllForAdmin(): Promise<ItemInBasket[]> {
        return ItemInBasket.find({

            relations: ['shopItem', 'user'],
        });
    }


    async clearBasket(userId: string) {

        const user = await this.userService.getOneUser(userId)

        if(!user){
            throw new Error('User not found!')
        }




        await ItemInBasket.delete({user});
    }

    async getTotalPrice(userId: string): Promise<GetTotalBasketPriceResponse> {
        const items = await this.getAllForUser(userId);

        return (await Promise.all(items.map(async item => item.shopItem.price * item.count * 1.23)))
            .reduce((prev, curr) => prev + curr, 0);
    }
}
