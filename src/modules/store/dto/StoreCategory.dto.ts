import { OmitType } from '@nestjs/swagger';
import { CategoryDTO } from '../../../modules/category/dto/Category.dto';

export class StoreCategoryDTO extends OmitType(CategoryDTO, ['store']) {}
