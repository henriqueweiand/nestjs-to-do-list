import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './dto/Category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async index(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async create(createCategoryDTO: CategoryDTO): Promise<Category> {
    const { name } = createCategoryDTO;
    const entity = this.categoryRepository.create({
      name,
    });

    return await this.categoryRepository.save(entity);
  }
}
