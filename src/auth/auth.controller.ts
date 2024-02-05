import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ListLoginDto } from './dto/list-login.dto';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { Roles } from '../decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ListLoginDto> {
    return this.authService.login(loginDto);
  }
}
