import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryDTO } from 'src/modules/category/dto/Category.dto';

export class ItemDTO {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiPropertyOptional()
  @IsOptional()
  category: CategoryDTO;
}
