import { Store } from '../../store.entity';
import { StoreDTO } from '../../dto/Store.dto';
import { DeleteResult } from 'typeorm';
import { mockedAddress } from '../../../address/__tests__/mock';
import { mockedCategory } from '../../../category/__tests__/mock';

export const mockedStore = {
  id: '43699511-39ee-4db6-8958-ff0067e0ae23',
  name: 'Store testings',
  document: 123456789,
  address: [],
  category: [],
} as Store;

export const mockedWithRelationsStore = {
  id: '43699511-39ee-4db6-8958-ff0067e0ae23',
  name: 'Store testings',
  document: 123456789,
  address: [mockedAddress],
  category: [mockedCategory],
} as Store;

export const mockedCreateStore = {
  name: 'Store testings',
  document: 123456789,
  address: [],
  category: [],
} as Store;

export const mockedUpdateStore = {
  id: '43699511-39ee-4db6-8958-ff0067e0ae23',
  name: 'Store testings',
  document: 123456789,
  address: [],
  category: [],
} as Store;

export const mockedUpdateWithRelationsStore = {
  id: '43699511-39ee-4db6-8958-ff0067e0ae23',
  name: 'Store testings',
  document: 123456789,
  address: [mockedAddress],
  category: [mockedCategory],
} as Store;

export const mockedDeleteStore = {
  raw: [],
  affected: 1,
} as DeleteResult;

export const mockedListStore = [mockedStore] as Store[];

// DTO

export const mockedCreateStoreDTO = {
  name: 'Store testings',
  document: 123456789,
} as StoreDTO;

export const mockedCreateStoreWithRelationDTO = {
  name: 'Store testings',
  document: 123456789,
  address: mockedAddress,
  category: [mockedCategory],
} as StoreDTO;

export const mockedUpdateStoreDTO = {
  name: 'Store testings',
  document: 123456789,
} as StoreDTO;

export const mockedUpdateStoreWithRelationsDTO = {
  name: 'Store testings',
  document: 123456789,
  address: mockedAddress,
  category: [mockedCategory],
} as StoreDTO;
