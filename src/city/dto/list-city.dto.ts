import { ListStateDto } from 'src/state/dto/list-state.dto';
import { CityEntity } from '../entities/city.entity';

export class ListCityDto {
  name: string;
  state: ListStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ListStateDto(city.state) : undefined;
  }
}
