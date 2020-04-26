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

  @Column({ name: 'storeId', type: 'uuid' })
  @ManyToOne(
    () => Store,
    store => store.item,
    {
      onDelete: 'CASCADE',
      nullable: false,
      cascade: ['insert', 'update', 'remove'],
    },
  )
  store: string;

  @Column({ name: 'categoryId', type: 'uuid', nullable: true })
  @ManyToOne(
    () => Category,
    category => category.item,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove'],
      eager: true,
    },
  )
  category: Category;
}
