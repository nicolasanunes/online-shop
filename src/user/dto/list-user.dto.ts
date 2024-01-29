import { ListAddressDto } from 'src/address/dto/list-address.dto';
import { UserEntity } from '../entities/user.entity';

export class ListUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ListAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.addresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new ListAddressDto(address))
      : undefined;
  }
}
