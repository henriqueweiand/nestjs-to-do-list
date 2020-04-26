import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'UUID of Store' })
  @IsNotEmpty()
  @IsUUID()
  store: string;
}
