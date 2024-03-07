import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { UserId } from '../decorator/user-id.decorator';
import { AddressEntity } from './entities/address.entity';
import { ListAddressDto } from './dto/list-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserTypeEnum.User, UserTypeEnum.Admin,  UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createAddress(
    @UserId() userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Roles(UserTypeEnum.User, UserTypeEnum.Admin,  UserTypeEnum.Root)
  @Get()
  async listAddressByUserId(
    @UserId() userId: number,
  ): Promise<ListAddressDto[]> {
    return (await this.addressService.listAddressByUserId(userId)).map(
      (address) => new ListAddressDto(address),
    );
  }
}
