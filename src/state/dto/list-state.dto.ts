import { StateEntity } from '../entities/state.entity';

export class ListStateDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
