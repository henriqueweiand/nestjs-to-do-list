import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import httpResponse from 'src/common/httpResponse';

import { AddressService } from './address.service';
import { Address } from './address.entity';
import { AddressDTO } from './dto/Address.dto';
import { UpdateAddressDTO } from './dto/UpdateAddress.dto';

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.BAD_REQUEST)
  index(): Promise<Address[]> {
    return this.addressService.index();
  }

  @Post()
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  create(@Body() addressDTO: AddressDTO): Promise<Address> {
    return this.addressService.create(addressDTO);
  }

  @Put(':id')
  @ApiResponse(httpResponse.CREATED)
  @ApiResponse(httpResponse.CONFLICT)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async update(@Param('id') id: string, @Body() addressDTO: UpdateAddressDTO) {
    return await this.addressService.update(id, addressDTO);
  }

  @Delete(':id')
  @ApiResponse(httpResponse.OK)
  @ApiResponse(httpResponse.NOT_FOUND)
  @ApiResponse(httpResponse.BAD_REQUEST)
  @ApiBasicAuth()
  async delete(@Param('id') id: string) {
    return await this.addressService.delete(id);
  }
}
