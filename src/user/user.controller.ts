import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserId } from '../decorator/user-id.decorator';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from './enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserTypeEnum.Admin)
  @Get()
  async listAllUsers(): Promise<ListUserDto[]> {
    return (await this.userService.listAllUsers()).map(
      (userEntity) => new ListUserDto(userEntity),
    );
  }

  @Roles(UserTypeEnum.Admin)
  @Get('/:userId')
  async listUserById(@Param('userId') userId: number): Promise<ListUserDto> {
    return new ListUserDto(
      await this.userService.listUserByIdUsingRelations(userId),
    );
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Patch()
  async updateUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(updateUserPasswordDto, userId);
  }
}
