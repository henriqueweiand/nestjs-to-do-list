import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ItemDTO } from './dto/Item.dto';
import { Address } from '../address/address.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async index(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async show(id: string): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } });
  }

  async create(itemDTO: ItemDTO): Promise<Item> {
    const { text, category } = itemDTO;
    const entity = this.itemRepository.create({
      text,
      // category,
    });

    return await this.itemRepository.save(entity);
  }

  async update(id: string, itemDTO: ItemDTO): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException();
    }

    try {
      const { text, category } = itemDTO;

      const itemUpdate = this.itemRepository.merge(item, {
        text,
      });

      if (category) {
        // itemUpdate.category = category as Category;
      }

      return await this.itemRepository.save(itemUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException();
    }

    try {
      await this.itemRepository.delete(item);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
