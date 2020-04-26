import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategoryDTO } from './ItemCategory.dto';

export class ItemDTO {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'UUID of Store' })
  @IsNotEmpty()
  @IsUUID()
  store: string;

  @ApiPropertyOptional({
    description: 'Optional to create/assign category',
  })
  @IsOptional()
  category: ItemCategoryDTO;
}
