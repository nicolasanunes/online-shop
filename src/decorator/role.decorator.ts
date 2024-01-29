import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
