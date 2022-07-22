import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';

@Injectable()
export class DiscountCodeService {
  create(createDiscountCodeDto: CreateDiscountCodeDto) {
    return 'This action adds a new discountCode';
  }

  findAll() {
    return `This action returns all discountCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountCode`;
  }

  update(id: number, updateDiscountCodeDto: UpdateDiscountCodeDto) {
    return `This action updates a #${id} discountCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountCode`;
  }
}
