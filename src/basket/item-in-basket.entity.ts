import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShopItem} from "../shop/shop-item.entity";
import {User} from "../user/user.entity";

@Entity()
export class ItemInBasket extends BaseEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    count: number;

    @ManyToOne(type => ShopItem, entity => entity.itemsInBasket)
    @JoinColumn()
    shopItem: ShopItem;

    @ManyToOne(type =>User, entity => entity.itemsInBasket)
    @JoinColumn()
    user:User
}

