export {};

type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = {
  readonly placa: Placa;
  tipo: 'carro';
  portas: 2 | 4;
};

type Moto = {
  readonly placa: Placa;
  tipo: 'moto';
  cilindradas: number;
};

type Caminhao = {
  readonly placa: Placa;
  tipo: 'caminhao';
  eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
  const h = Math.max(1, horas);
  switch (v.tipo) {
    case 'carro':
      return 8.00 + (h > 1 ? (h - 1) * 5.00 : 0);
    case 'moto':
      return 4.00 + (h > 1 ? (h - 1) * 2.00 : 0);
    case 'caminhao':
      return 15.00 + (h > 1 ? (h - 1) * 10.00 : 0);
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

function fecharTicket(t: Ticket): Ticket {
  const [entrada, saida] = t.periodo;
  const horas = Math.max(1, saida - entrada);
  let valor = calcularTarifa(t.veiculo, horas);
  if (t.selo) {
    valor *= 0.5;
  }
  return {
    ...t,
    situacao: SituacaoTicket.Pago,
    valor,
  };
}

function registrar(msg: string): void {
  console.log(msg);
}

function falhar(msg: string): never {
  throw new Error(msg);
}

function lerVeiculo(json: string): Veiculo {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch {
    falhar('JSON malformado');
  }

  if (typeof dados !== 'object' || dados === null || !('placa' in dados) || !('tipo' in dados)) {
    falhar('Veículo inválido');
  }

  const obj = dados as any;
  const tipo = obj.tipo;

  if (tipo === 'carro') {
    return { placa: obj.placa, tipo: 'carro', portas: obj.portas };
  } else if (tipo === 'moto') {
    return { placa: obj.placa, tipo: 'moto', cilindradas: obj.cilindradas };
  } else if (tipo === 'caminhao') {
    return { placa: obj.placa, tipo: 'caminhao', eixos: obj.eixos };
  } else {
    falhar(`Erro ao ler veículo: tipo "${tipo}" desconhecido`);
  }
}

const ticketsOriginais: Ticket[] = [
  { veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, periodo: [8, 11], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 }, periodo: [9, 10], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, periodo: [7, 12], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 }, periodo: [14, 16], selo: true, situacao: SituacaoTicket.Aberto },
];

const ticketsFechados = ticketsOriginais.map(t => {
  const fechado = fecharTicket(t);
  const [, ,] = fechado.periodo;
  const horas = Math.max(1, fechado.periodo[1] - fechado.periodo[0]);
  const seloTexto = t.selo ? ' (selo -50%)' : '';
  registrar(`[PAGO] ${fechado.veiculo.placa} (${fechado.veiculo.tipo}) - ${horas}h - R$ ${fechado.valor?.toFixed(2)}${seloTexto}`);
  return fechado;
});

const faturamentoTotal = ticketsFechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamentoTotal.toFixed(2)}`);

const contagem = ticketsFechados.reduce(
  (acc, t) => {
    acc[t.veiculo.tipo]++;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);
console.log(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC1234","tipo":"bicicleta"}');
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(e.message);
  }
}
