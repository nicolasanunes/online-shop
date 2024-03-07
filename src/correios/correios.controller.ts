import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ListCepDto } from './dto/list-cep.dto';
import { ResponsePriceCorreiosDto } from './dto/response-price-correios.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/price-delivery')
  async findPriceDelivery(): Promise<ResponsePriceCorreiosDto> {
    return this.correiosService.findPriceDelivery();
  }

  @Get(':cep')
  async findAddressByCep(@Param('cep') cep: string): Promise<ListCepDto> {
    return this.correiosService.findAddressByCep(cep);
  }
}
