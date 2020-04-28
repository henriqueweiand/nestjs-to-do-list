import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { factory } from 'typeorm-factories';

import { StoreModule } from '../store.module';
import { typeOrmConfig } from '../../../config/typeorm.config';
import { Store } from '../store.entity';
import { Repository } from 'typeorm';
import { StoreFactory } from '../store.factory';

let app: INestApplication;
let repository: Repository<Store>;
let storeFactory: StoreFactory;

describe('StoreModule (e2e)', () => {
  // Setup
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
    storeFactory = module.get<StoreFactory>(StoreFactory);
    repository = module.get<Repository<Store>>(getRepositoryToken(Store));

    await app.init();
  });

  // Boot
  afterEach(async () => {
    await repository.delete({});
  });

  // Tests
  it('list a collection', async () => {
    await storeFactory.make();

    const { body } = await request
      .agent(app.getHttpServer())
      .get('/store')
      .set('Accept', 'application/json');

    expect(body.length).toBeGreaterThanOrEqual(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
