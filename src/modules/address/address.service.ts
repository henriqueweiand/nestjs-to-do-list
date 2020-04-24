import { Injectable } from '@nestjs/common';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDTO } from './dto/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async index(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async create(createAddressDTO: CreateAddressDTO): Promise<Address> {
    const {
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    } = createAddressDTO;
    const entity = this.addressRepository.create({
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    });

    return await this.addressRepository.save(entity);
  }
}
