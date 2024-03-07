import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ListCepExternalDto } from './dto/list-cep-external.dto';
import { CityService } from '../city/city.service';
import { ListCepDto } from './dto/list-cep.dto';
import { CityEntity } from '../city/entities/city.entity';
import { Client } from 'nestjs-soap';
import { ResponsePriceCorreiosDto } from './dto/response-price-correios.dto';

@Injectable()
export class CorreiosService {
  URL_CEP_CORREIOS = process.env.URL_CEP_CORREIOS;

  constructor(
    @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ListCepDto> {
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

    const city: CityEntity | undefined = await this.cityService
      .findCityByName(listCep.localidade, listCep.uf)
      .catch(() => undefined);

    return new ListCepDto(listCep, city?.id, city?.state?.id);
  }

  async findPriceDelivery(): Promise<ResponsePriceCorreiosDto> {
    return new Promise((resolve) => {
      this.soapClient.calcPrecoPrazo(
        {
          nCdServico: '40010',
          sCepOrigem: '22270010',
          sCepDestino: '89010000',
          nCdFormato: 1,
          nVlPeso: 2,
          nVlComprimento: 30,
          nVlAltura: 30,
          nVlLargura: 30,
          nVlDiametro: 30,
          nCdEmpresa: '',
          sDsSenha: '',
          sCdMaoPropria: 'N',
          nVlValorDeclarado: 0,
          sCdAvisoRecebimento: 'N',
        },
        (_, res: ResponsePriceCorreiosDto) => {
          if (res) {
            resolve(res);
          } else {
            throw new BadRequestException('Error SOAP');
          }
        },
      );
    });
  }
}
