import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDTO } from 'src/modules/address/dto/Address.dto';

export class StoreDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  document: string;

  @ApiPropertyOptional()
  @IsOptional()
  address: AddressDTO;
}
