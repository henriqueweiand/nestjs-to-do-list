import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  neighborhood: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ name: 'storeId', type: 'uuid' })
  @ManyToOne(
    () => Store,
    store => store.id,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  store: string;
}
