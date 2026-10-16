export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
}

// lerComAny(respostaQuebrada); // Erro em execução: dados.temperatura.toFixed is not a function

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch {
    falhar('JSON malformado');
  }

  if (
    typeof dados === 'object' &&
    dados !== null &&
    'cidade' in dados &&
    typeof (dados as any).cidade === 'string' &&
    'temperatura' in dados
  ) {
    if (typeof (dados as any).temperatura !== 'number') {
      falhar('campo "temperatura" inválido');
    }
    return {
      cidade: (dados as any).cidade,
      temperatura: (dados as any).temperatura,
    };
  }

  falhar('Dados inválidos');
}

const testes = [respostaOk, respostaQuebrada, respostaInvalida];

testes.forEach(resp => {
  try {
    const resultado = lerClima(resp);
    console.log(`${resultado.cidade}: ${resultado.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    }
  }
});
