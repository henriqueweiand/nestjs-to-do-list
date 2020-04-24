import { Controller, Get, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AddressService } from './address.service';
import { Address } from './address.entity';
import { CreateAddressDTO } from './dto/createAddress.dto';

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  index(): Promise<Address[]> {
    return this.addressService.index();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  create(@Body() createAddressDTO: CreateAddressDTO): Promise<Address> {
    return this.addressService.create(createAddressDTO);
  }
}
