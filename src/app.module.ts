import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { AddressModule } from './modules/address/address.module';
import { StoreModule } from './modules/store/store.module';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';
import { MainModule } from './modules/main/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MainModule,
    StoreModule,
    AddressModule,
    CategoryModule,
    ItemModule,
  ],
  providers: [],
})
export class AppModule {}
