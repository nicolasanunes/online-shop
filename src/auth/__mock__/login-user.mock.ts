import { userMock } from '../../user/__mock__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const loginUserMock: LoginDto = {
  email: userMock.email,
  password: 'senha123',
};
