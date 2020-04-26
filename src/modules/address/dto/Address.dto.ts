import { IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'UUID of Store' })
  @IsNotEmpty()
  @IsUUID()
  store: string;
}
