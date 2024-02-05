import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeEnum } from './enum/user-type.enum';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { createHashedPassword, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.listUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException(`e-mail already exists`);
    }

    const hashedPassword = await createHashedPassword(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserTypeEnum.User,
      password: hashedPassword,
    });
  }

  async listAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`userId: ${userId} not found.`);
    }

    return user;
  }

  async listUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`email: ${email} not found.`);
    }

    return user;
  }

  async listUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async updateUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const hashedPassword = await createHashedPassword(
      updateUserPasswordDto.newPassword,
    );

    const isMatch = await validatePassword(
      updateUserPasswordDto.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Invalidad last password');
    }

    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
}
