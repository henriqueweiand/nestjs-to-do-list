import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { Item } from '../item/item.entity';
import { Category } from '../category/category.entity';

@Entity()
@Unique(['document'])
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @OneToMany(
    () => Address,
    address => address.store,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove'],
      eager: true,
    },
  )
  address: Address[];

  @OneToMany(
    () => Item,
    item => item.id,
    {
      nullable: true,
    },
  )
  item: Item[];

  @OneToMany(
    () => Category,
    category => category.id,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove'],
      eager: true,
    },
  )
  category: Category[];
}
