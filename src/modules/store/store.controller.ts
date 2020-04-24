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

import { StoreService } from './store.service';
import { Store } from './store.entity';
import { StoreDTO } from './dto/Store.dto';
import { ErrorsInterceptor } from 'src/common/interceptor/errors.interceptor';
import httpResponse from 'src/common/httpResponse';

@Controller('store')
@ApiTags('store')
@UseInterceptors(ErrorsInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiResponse(httpResponse.OK)
  @ApiBasicAuth()
  index(): Promise<Store[]> {
    return this.storeService.index();
  }

  @Post()
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async create(@Body() storeDTO: StoreDTO) {
    return await this.storeService.create(storeDTO);
  }

  @Put(':id')
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() storeDTO: StoreDTO) {
    return await this.storeService.update(id, storeDTO);
  }

  @Delete(':id')
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.storeService.delete(id);
  }
}
