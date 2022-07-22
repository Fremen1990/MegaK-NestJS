import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';

@Module({
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService]
})
export class DiscountCodeModule {}
