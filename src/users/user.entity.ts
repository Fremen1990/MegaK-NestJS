import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"User"})
 class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  nick: string;
}