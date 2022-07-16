import { forwardRef, Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from '../basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    forwardRef(() => BasketModule)],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {
}