import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { StoreDTO } from './dto/Store.dto';
import { Address } from '../address/address.entity';

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
    const { name, document, address } = storeDTO;
    const entity = this.storeRepository.create({
      name,
      document,
      address: address ? [address] : [],
    });

    return await this.storeRepository.save(entity);
  }

  async update(id: string, storeDTO: StoreDTO): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id } });

    if (!store) {
      throw new NotFoundException();
    }

    try {
      const { name, document, address } = storeDTO;

      const storeUpdate = this.storeRepository.merge(store, {
        name,
        document,
      });

      if (address) {
        storeUpdate.address = [address as Address];
      }

      return await this.storeRepository.save(storeUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const store = await this.storeRepository.findOne({ where: { id } });

    if (!store) {
      throw new NotFoundException();
    }

    try {
      await this.storeRepository.delete(store);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
