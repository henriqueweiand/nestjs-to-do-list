import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressDTO } from './dto/Address.dto';
import { StoreService } from '../store/store.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private storeService: StoreService,
  ) {}

  async index(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async create(createAddressDTO: AddressDTO): Promise<Address> {
    const {
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
      store,
    } = createAddressDTO;

    const storeExists = await this.storeService.show(store);

    if (!storeExists) {
      throw new NotFoundException('Store not found');
    }

    const entity = this.addressRepository.create({
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
      store,
    });

    return await this.addressRepository.save(entity);
  }

  async update(id: string, addressDTO: AddressDTO): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    const { store } = addressDTO;

    if (!address) {
      throw new NotFoundException();
    }

    const storeExists = await this.storeService.show(store);

    if (!storeExists) {
      throw new NotFoundException('Store not found');
    }

    try {
      const addressUpdate = this.addressRepository.merge(address, addressDTO);

      return await this.addressRepository.save(addressUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException();
    }

    try {
      await this.addressRepository.delete(address);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
