import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Item } from './item.entity';
import { Category } from '../category/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ItemDTO } from './dto/Item.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly categoryService: CategoryService,
  ) {}

  async index(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(itemDTO: ItemDTO): Promise<Item> {
    const { store, category, text } = itemDTO;
    let categoryExist: Category | null = null;

    try {
      if (category) {
        categoryExist = await this.categoryService.findOrCreate({
          store,
          name: category!.name,
        });
      }

      const entity = this.itemRepository.create({
        text,
        store,
      });

      if (category && categoryExist) {
        entity.category = categoryExist;
      }

      return await this.itemRepository.save(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, itemDTO: ItemDTO): Promise<Item> {
    const { store, category, ...itemData } = itemDTO;
    let categoryExist: Category | null = null;
    const entity = await this.itemRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      if (category) {
        categoryExist = await this.categoryService.findOrCreate({
          store,
          name: category!.name,
        });
      }

      const entityUpdate = this.itemRepository.merge(entity, {
        ...itemData,
      });

      return await this.itemRepository.save({
        ...entityUpdate,
        category: categoryExist,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.itemRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      await this.itemRepository.delete(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
