import { ListCityDto } from '../../city/dto/list-city.dto';
import { AddressEntity } from '../entities/address.entity';

export class ListAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ListCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ListCityDto(address.city) : undefined;
  }
}
