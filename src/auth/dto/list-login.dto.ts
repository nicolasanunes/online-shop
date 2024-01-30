import { ListUserDto } from '../../user/dto/list-user.dto';

export class ListLoginDto {
  user: ListUserDto;
  accessToken: string;
}
