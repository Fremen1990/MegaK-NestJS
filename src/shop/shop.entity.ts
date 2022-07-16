import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ type:'text', default:null, nullable:true })
  description: string ;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: ()=>'CURRENT_TIMESTAMP'
  })
  createdAt: Date
}