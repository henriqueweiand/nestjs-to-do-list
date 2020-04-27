import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

import { StoreModule } from '../store.module';
import { typeOrmConfig } from '../../../config/typeorm.config';
import { Store } from '../store.entity';
import { Repository } from 'typeorm';

let app: INestApplication;
let repository: Repository<Store>;

describe('StoreModule (e2e)', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmConfig), StoreModule],
      providers: [
        {
          provide: getRepositoryToken(Store),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    repository = module.get<Repository<Store>>(getRepositoryToken(Store));

    await app.init();
  });

  it('/store (GET)', () => {
    return request(app.getHttpServer())
      .get('/store')
      .expect(200);
  });
});
