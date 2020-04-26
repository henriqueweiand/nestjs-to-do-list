import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './dto/Category.dto';

import { UpdateCategoryDTO } from './dto/UpdateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async index(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async create(categoryDTO: CategoryDTO): Promise<Category> {
    const entity = this.categoryRepository.create(categoryDTO);

    return await this.categoryRepository.save(entity);
  }

  async update(id: string, categoryDTO: UpdateCategoryDTO): Promise<Category> {
    const entity = await this.categoryRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      const entityUpdate = this.categoryRepository.merge(entity, categoryDTO);

      return await this.categoryRepository.save(entityUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.categoryRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      await this.categoryRepository.delete(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
