import {Injectable} from '@nestjs/common';
import {ShopItem} from "./shop-item.entity";
import {ShopItemInterface} from "../interfaces/shop";
import {AddProductDto} from "./dto/add-product.dto";
import {MulterDiskUploadedFiles} from "../interfaces/files";
import * as fs from 'fs'
import * as path from "path";
import {storageDir} from "../utils/storage";

@Injectable()
export class ShopService {


    filter(shopItem: ShopItem): ShopItemInterface{
        const {id, price, description, name}=shopItem;
        return {id, price, description, name}
    }

    async getItems(): Promise<ShopItemInterface[]> {

        // LONG VERSION
        // return (await ShopItem.find()).map(shopItem=>{
        //     const {id, price, description, name}=shopItem;
        //     return {id, price, description, name}
        // })

        //SHORTHAND
        return (await  ShopItem.find()).map(this.filter);
    }

    async hasItem(name: string): Promise<boolean> {
        return (await this.getItems()).some(item => item.name === name);
    }

    async getPrice(name: string): Promise<number> {
        return (await this.getItems()).find(item => item.name === name).price;
    }

    async getOneItem(id: string): Promise<ShopItem> {
        return await ShopItem.findOne(id);
    }

    async addProduct(req: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShopItemInterface> {

        const photo = files?.photo?.[0] ?? null;

        try {

            // console.log({req})
            // console.log({photo})

            const shopItem = new ShopItem()
            shopItem.name = req.name;
            shopItem.description = req.description;
            shopItem.price = req.price;

            // throw new Error("ohhhhnowwww!!")

            if (photo) {
                shopItem.photoFN = photo.filename
            }

            await shopItem.save()


        //LONG VERSION
            // return {
            //     id: shopItem.id,
            //     name: shopItem.name,
            //     description: shopItem.description,
            //     price: shopItem.price
            // }

        //    SHORTHAND
            return this.filter(shopItem)


        } catch (error) {
            try {
                if (photo) {

                    fs.unlinkSync(
                        path.join(storageDir(), 'product-photos', photo.filename)
                        )
                }
            } catch (error2) {
                console.error("file could not be deleted, error message: ", error2)

            }
            console.error("Could not upload the file,  removed from drive")
            throw error

        }


    }
}
