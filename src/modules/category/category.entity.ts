import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'storeId', type: 'uuid' })
  @ManyToOne(
    () => Store,
    store => store.id,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  store: string;
}
