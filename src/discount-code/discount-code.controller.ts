import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';

@Controller('discount-code')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Post()
  create(@Body() createDiscountCodeDto: CreateDiscountCodeDto) {
    return this.discountCodeService.create(createDiscountCodeDto);
  }

  @Get()
  findAll() {
    return this.discountCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountCodeDto: UpdateDiscountCodeDto) {
    return this.discountCodeService.update(+id, updateDiscountCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountCodeService.remove(+id);
  }
}
