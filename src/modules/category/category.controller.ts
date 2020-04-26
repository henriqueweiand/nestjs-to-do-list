import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import httpResponse from 'src/common/httpResponse';

import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/Category.dto';
import { UpdateCategoryDTO } from './dto/UpdateCategory.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.BAD_REQUEST)
  index(): Promise<Category[]> {
    return this.categoryService.index();
  }

  @Post()
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryService.create(categoryDTO);
  }

  @Put(':id')
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async update(
    @Param('id') id: string,
    @Body() categoryDTO: UpdateCategoryDTO,
  ) {
    return await this.categoryService.update(id, categoryDTO);
  }

  @Delete(':id')
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
