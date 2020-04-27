import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Item } from '../item/item.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'storeId', type: 'uuid' })
  @ManyToOne(
    () => Store,
    store => store.category,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  store: string;

  @OneToMany(
    () => Item,
    item => item.category,
    {
      nullable: true,
    },
  )
  item: Item;
}
