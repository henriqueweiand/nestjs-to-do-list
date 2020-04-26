import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressDTO } from './dto/Address.dto';
import { UpdateAddressDTO } from './dto/UpdateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
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

  async update(id: string, addressDTO: UpdateAddressDTO): Promise<Address> {
    const entity = await this.addressRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      const entityUpdate = this.addressRepository.merge(entity, addressDTO);

      return await this.addressRepository.save(entityUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.addressRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }

    try {
      await this.addressRepository.delete(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
