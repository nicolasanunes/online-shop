import { ListCepExternalDto } from './list-cep-external.dto';

export class ListCepDto {
  cep: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  ddd: string;
  cityId?: number;
  stateId?: number;

  constructor(listCep: ListCepExternalDto, cityId: number, stateId: number) {
    this.cep = listCep.cep;
    this.street = listCep.logradouro;
    this.complement = listCep.complemento;
    this.neighborhood = listCep.bairro;
    this.city = listCep.localidade;
    this.uf = listCep.uf;
    this.ddd = listCep.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}
