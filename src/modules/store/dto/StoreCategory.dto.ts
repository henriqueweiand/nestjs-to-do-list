import { OmitType } from '@nestjs/swagger';
import { CategoryDTO } from 'src/modules/category/dto/Category.dto';

export class StoreCategoryDTO extends OmitType(CategoryDTO, ['store']) {}
