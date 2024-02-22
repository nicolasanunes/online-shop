import { userMock } from '../../user/__mock__/user.mock';
import { ListLoginDto } from '../dto/list-login.dto';
import { jwtMock } from './jwt.mock';

export const listLoginMock: ListLoginDto = {
  accessToken: jwtMock,
  user: userMock,
};
