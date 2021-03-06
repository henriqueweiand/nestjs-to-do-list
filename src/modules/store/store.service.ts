import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './store.entity';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { StoreDTO } from './dto/Store.dto';
import { Address } from '../address/address.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async index(): Promise<Store[]> {
    return await this.storeRepository.find();
  }

  async show(id: string): Promise<Store> {
    return await this.storeRepository.findOne({ where: { id } });
  }

  async create(storeDTO: StoreDTO): Promise<Store> {
    const { name, document, address, category } = storeDTO;

    const entity = this.storeRepository.create({
      name,
      document,
      address: address ? [address] : [],
      category: category ? category : [],
    });

    return await this.storeRepository.save(entity);
  }

  async update(id: string, storeDTO: StoreDTO): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id } });

    if (!store) {
      throw new NotFoundException();
    }

    const { name, document, address, category } = storeDTO;

    const storeUpdate = this.storeRepository.merge(store, {
      name,
      document,
    });

    if (address) {
      storeUpdate.address = [address as Address];
    }

    if (category) {
      storeUpdate.category = category as Category[];
    }

    return await this.storeRepository.save(storeUpdate);
  }

  async delete(id: string): Promise<DeleteResult> {
    const store = await this.storeRepository.findOne({ where: { id } });

    if (!store) {
      throw new NotFoundException();
    }

    return await this.storeRepository.delete(store);
  }
}
