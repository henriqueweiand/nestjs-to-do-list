import { OmitType } from '@nestjs/swagger';
import { AddressDTO } from './Address.dto';

export class UpdateAddressDTO extends OmitType(AddressDTO, ['store']) {}
