import { AddressEntity } from '../entities/address.entity';

export class ListAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: void;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}
