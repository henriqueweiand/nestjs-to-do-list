import { OmitType } from '@nestjs/swagger';
import { AddressDTO } from 'src/modules/address/dto/Address.dto';

export class StoreAddressDTO extends OmitType(AddressDTO, ['store']) {}
