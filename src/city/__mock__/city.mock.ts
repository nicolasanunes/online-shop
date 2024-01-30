import { stateMock } from '../../state/__mock__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  id: 4241,
  name: 'cityMockName',
  stateId: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
