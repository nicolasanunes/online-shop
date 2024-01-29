import { ListUserDto } from 'src/user/dto/list-user.dto';

export class ListLoginDto {
  user: ListUserDto;
  accessToken: string;
}
