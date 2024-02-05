import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Get()
  async listAllStates(): Promise<StateEntity[]> {
    return this.stateService.listAllStates();
  }
}
