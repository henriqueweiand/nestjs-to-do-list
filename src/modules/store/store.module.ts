import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './store.entity';
import { StoreFactory } from './store.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService, StoreFactory],
  exports: [StoreService, StoreFactory],
  controllers: [StoreController],
})
export class StoreModule {}
