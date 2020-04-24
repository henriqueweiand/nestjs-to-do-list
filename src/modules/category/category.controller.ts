import { Controller, Get, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/Category.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  index(): Promise<Category[]> {
    return this.categoryService.index();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryService.create(categoryDTO);
  }
}
