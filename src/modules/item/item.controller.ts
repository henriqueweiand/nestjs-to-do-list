import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';

import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ItemDTO } from './dto/Item.dto';
import { ErrorsInterceptor } from '../../common/interceptor/errors.interceptor';
import httpResponse from '../../common/httpResponse';

@Controller('item')
@ApiTags('item')
@UseInterceptors(ErrorsInterceptor)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiResponse(httpResponse.OK)
  @ApiBasicAuth()
  index(): Promise<Item[]> {
    return this.itemService.index();
  }

  @Post()
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async create(@Body() itemDTO: ItemDTO) {
    return await this.itemService.create(itemDTO);
  }

  @Put(':id')
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() itemDTO: ItemDTO) {
    return await this.itemService.update(id, itemDTO);
  }

  @Delete(':id')
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.itemService.delete(id);
  }
}
