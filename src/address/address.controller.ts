import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorator/user-id.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post()
  async createAddress(
    @UserId() userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
