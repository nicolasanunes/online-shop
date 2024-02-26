import { ListCityDto } from '../../city/dto/list-city.dto';
import { AddressEntity } from '../entities/address.entity';

export class ListAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ListCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ListCityDto(address.city) : undefined;
  }
}
