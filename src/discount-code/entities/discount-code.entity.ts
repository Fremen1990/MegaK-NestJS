import {BaseEntity, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DiscountCode extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:string

}
