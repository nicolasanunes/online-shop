import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ListCepExternalDto } from './dto/list-cep-external.dto';
import { CityService } from 'src/city/city.service';

@Injectable()
export class CorreiosService {
  URL_CEP_CORREIOS = process.env.URL_CEP_CORREIOS;

  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ListCepExternalDto> {
    const listCep: ListCepExternalDto = await this.httpService.axiosRef
      .get<ListCepExternalDto>(this.URL_CEP_CORREIOS.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          `Error in connection request ${error.message}`,
        );
      });

    const city = await this.cityService.findCityByName(
      listCep.localidade,
      listCep.uf,
    );

    return listCep;
  }
}
