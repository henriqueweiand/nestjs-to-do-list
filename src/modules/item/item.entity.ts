import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(
    () => Store,
    store => store.id,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  store: Store;

  @ManyToOne(
    () => Category,
    category => category.id,
    {
      nullable: true,
    },
  )
  category: Category;
}
