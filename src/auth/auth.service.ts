import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .listUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`Email or password invalid`);
    }

    return user;
  }
}
