import {Body, Controller, Get, Inject, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ShopItemInterface} from "../interfaces/shop";
import {ShopService} from './shop.service';
import {AddProductDto} from "./dto/add-product.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import * as path from "path";
import {storageDir} from "../utils/storage";
import {MulterDiskUploadedFiles} from "../interfaces/files";


@Controller('shop')
export class ShopController {

    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }

    @Get('/')
    getShopList(): Promise<ShopItemInterface[]> {
        return this.shopService.getItems();
    }


    @Post('/')
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: 'photo', maxCount: 1},

        ], {dest: path.join(storageDir(), 'product-photos')})
    )


    addProduct(
        @Body() req: AddProductDto,
        @UploadedFiles() files: MulterDiskUploadedFiles,
    ): Promise<ShopItemInterface> {
        return this.shopService.addProduct(req, files)
    }

}
