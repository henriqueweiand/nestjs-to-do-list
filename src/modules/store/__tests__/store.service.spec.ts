import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { repositoryMockFactory } from '../../common/__tests__/mock/repositoryMockFactory';
import { MockType } from '../../common/__tests__/mock';
import { StoreService } from '../store.service';
import { Store } from '../store.entity';
import {
  mockedStore,
  mockedListStore,
  mockedDeleteStore,
  mockedWithRelationsStore,
  mockedCreateStoreDTO,
  mockedUpdateStoreDTO,
  mockedCreateStoreWithRelationDTO,
  mockedUpdateStoreWithRelationsDTO,
} from './mock';

describe('StoreService', () => {
  let storeService: StoreService;
  let storeRepository: MockType<Repository<Store>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: getRepositoryToken(Store),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    storeService = module.get<StoreService>(StoreService);
    storeRepository = module.get(getRepositoryToken(Store));
  });

  describe('index', () => {
    it('gets all stores', async () => {
      storeRepository.find.mockImplementation(() =>
        Promise.resolve(mockedListStore),
      );
      expect(await storeService.index()).toEqual(mockedListStore);
    });

    it('get a store', async () => {
      storeRepository.findOne.mockImplementation(() =>
        Promise.resolve(mockedStore),
      );
      expect(await storeService.show(mockedStore.id)).toEqual(mockedStore);
    });
  });

  describe('create', () => {
    it('should create', async () => {
      storeRepository.create.mockImplementation(() =>
        Promise.resolve(mockedStore),
      );
      expect(await storeService.create(mockedCreateStoreDTO)).toEqual(
        mockedStore,
      );
    });

    it('should create with relations', async () => {
      storeRepository.create.mockImplementation(() =>
        Promise.resolve(mockedWithRelationsStore),
      );
      expect(
        await storeService.create(mockedCreateStoreWithRelationDTO),
      ).toEqual(mockedWithRelationsStore);
    });
  });

  describe('update', () => {
    it('should be update', async () => {
      storeRepository.findOne.mockImplementation(() =>
        Promise.resolve(mockedStore),
      );
      storeRepository.preload.mockImplementation(() =>
        Promise.resolve(mockedUpdateStoreDTO),
      );
      expect(
        await storeService.update(mockedStore.id, mockedUpdateStoreDTO),
      ).toEqual(mockedStore);
    });

    it('should be update with relations', async () => {
      storeRepository.findOne.mockImplementation(() =>
        Promise.resolve(mockedStore),
      );
      storeRepository.preload.mockImplementation(() =>
        Promise.resolve(mockedUpdateStoreWithRelationsDTO),
      );
      expect(
        await storeService.update(
          mockedStore.id,
          mockedUpdateStoreWithRelationsDTO,
        ),
      ).toEqual(mockedWithRelationsStore);
    });

    it('should be update but not found ', async () => {
      storeRepository.findOne.mockImplementation(() => undefined);
      await expect(
        storeService.update('uid', mockedUpdateStoreDTO),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should be delete a store', async () => {
      storeRepository.findOne.mockImplementation(() =>
        Promise.resolve(mockedStore),
      );
      storeRepository.delete.mockImplementation(() =>
        Promise.resolve(mockedDeleteStore),
      );
      expect(await storeService.delete(mockedStore.id)).toEqual(
        mockedDeleteStore,
      );
    });

    it('should be delete but not found ', async () => {
      storeRepository.findOne.mockImplementation(() => undefined);
      await expect(storeService.delete('uid')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
