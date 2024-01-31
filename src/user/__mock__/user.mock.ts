import { UserEntity } from '../entities/user.entity';
import { UserTypeEnum } from '../enum/user-type.enum';

export const userMock: UserEntity = {
  cpf: '12345678912',
  email: 'email@email.com',
  id: 4242,
  name: 'nameMock',
  password: '$2b$10$YPXJxgliRxLKhCTvccZot.DooBgelqBFZQVhQnLGjsfoP1Lrw5N7W',
  phone: '34999999999',
  typeUser: UserTypeEnum.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
