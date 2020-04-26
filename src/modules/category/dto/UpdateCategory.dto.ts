import { OmitType } from '@nestjs/swagger';
import { CategoryDTO } from './Category.dto';

export class UpdateCategoryDTO extends OmitType(CategoryDTO, ['store']) {}
