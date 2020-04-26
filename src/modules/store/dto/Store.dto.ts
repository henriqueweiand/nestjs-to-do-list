import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StoreAddressDTO } from './StoreAddress.dto';
import { StoreCategoryDTO } from './StoreCategory.dto';

export class StoreDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  document: string;

  @ApiPropertyOptional({ description: 'Optional to create address' })
  @IsOptional()
  address: StoreAddressDTO;

  @ApiPropertyOptional({
    isArray: true,
    type: StoreCategoryDTO,
    description: 'Optional to create category',
  })
  @IsOptional()
  category: StoreCategoryDTO[];
}
