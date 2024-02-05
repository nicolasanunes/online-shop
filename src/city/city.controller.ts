import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Get('/:stateId')
  async listAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.listAllCitiesByStateId(stateId);
  }
}
