import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post('/:userId')
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
