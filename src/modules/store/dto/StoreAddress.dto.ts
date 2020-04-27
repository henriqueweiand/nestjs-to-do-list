import { OmitType } from '@nestjs/swagger';
import { AddressDTO } from '../../../modules/address/dto/Address.dto';

export class StoreAddressDTO extends OmitType(AddressDTO, ['store']) {}
