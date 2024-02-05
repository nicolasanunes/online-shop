import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

export const updateUserPasswordMock: UpdateUserPasswordDto = {
  lastPassword: 'senha123',
  newPassword: 'sahushau',
};

export const updateInvalidUserPasswordMock: UpdateUserPasswordDto = {
  lastPassword: 'dsjsdjk',
  newPassword: 'dsjksjkfsjk',
};
