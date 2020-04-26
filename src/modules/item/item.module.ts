import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CategoryModule],
  providers: [ItemService],
  exports: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
