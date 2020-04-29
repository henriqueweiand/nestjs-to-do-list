import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import projectConfig from './index';

export const typeOrmConfig: TypeOrmModuleOptions = projectConfig.database;
