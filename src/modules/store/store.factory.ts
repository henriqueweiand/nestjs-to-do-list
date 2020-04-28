import * as Faker from 'faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Store } from './store.entity';

@Injectable()
export class StoreFactory {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async make(store?: Partial<Store>): Promise<Store> {
    const entity = this.storeRepository.create({
      name: store?.name || Faker.name.findName(),
      document: store?.document || Faker.random.number(),
    });

    return await this.storeRepository.save(entity);
  }
}
