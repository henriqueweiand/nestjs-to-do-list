import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from './modules/address/address.module';
import { StoreModule } from './modules/store/store.module';
import { Category } from './modules/category/category.entity';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    StoreModule,
    AddressModule,
    Category,
    ItemModule,
  ],
  providers: [],
})
export class AppModule {}
