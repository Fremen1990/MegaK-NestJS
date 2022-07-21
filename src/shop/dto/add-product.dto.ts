import {IsNumber, IsString, Length, Min} from "class-validator";

export class AddProductDto{
    @IsString()
    name: string;

    @IsString()
    @Length(10,1000)
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

}