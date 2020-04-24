import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
