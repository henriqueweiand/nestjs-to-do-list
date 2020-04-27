import { MockType } from './MockType';
import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    delete: jest.fn(),
    merge: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity),
    findOneOrFail: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
    findAndCount: jest.fn(entity => entity),
    preload: jest.fn(entity => entity),
    createQueryBuilder: jest.fn(entity => entity),
    index: jest.fn(entity => entity),
  }),
);
