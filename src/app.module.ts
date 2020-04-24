import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from './modules/address/address.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StoreModule, AddressModule],
  providers: [],
})
export class AppModule {}
