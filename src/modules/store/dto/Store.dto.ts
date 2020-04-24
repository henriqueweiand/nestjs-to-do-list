import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAddressDTO } from 'src/modules/address/dto/createAddress.dto';

export class StoreDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  document: string;

  @ApiPropertyOptional()
  @IsOptional()
  address: CreateAddressDTO;
}
