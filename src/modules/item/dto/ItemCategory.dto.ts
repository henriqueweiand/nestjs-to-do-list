import { CategoryDTO } from 'src/modules/category/dto/Category.dto';
import { OmitType } from '@nestjs/swagger';

export class ItemCategoryDTO extends OmitType(CategoryDTO, ['store']) {}
