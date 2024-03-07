export class ResponsePriceCorreiosDto {
  CalcPrecoPrazoResult: CalcPrecoPrazoResultDto;
}

export class CalcPrecoPrazoResultDto {
  Servicos: ServicosDto;
}

export class ServicosDto {
  cServico: CServicoDto[];
}

export class CServicoDto {
  Codigo: number;
  Valor: string;
  PrazoEntrega: string;
  ValorMaoPropria: string;
  ValorAvisoRecebimento: string;
  ValorValorDeclarado: string;
  EntregaDomiciliar: string;
  EntregaSabado: string;
  Erro: string;
  MsgErro: string;
  ValorSemAdicionais: string;
  obsFim: string;
}
