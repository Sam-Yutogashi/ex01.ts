export {};

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  const minima = Math.min(...temps);
  const maxima = Math.max(...temps);
  return [minima, maxima];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const tempsApenas = leituras.map(l => l[1]);
const [min, max] = extremos(tempsApenas);
const media = tempsApenas.reduce((a, b) => a + b, 0) / tempsApenas.length;

console.log(`Mínima: ${min}°C | Máxima: ${max}°C | Média: ${media.toFixed(1)}°C`);

type Contato = [nome: string, telefone: string, email?: string];
const contatoComEmail: Contato = ['Ana', '(69) 99999-1111', 'ana@email.com'];
const contatoSemEmail: Contato = ['Bruno', '(69) 98888-2222'];

type HistoricoSemanal = [string, ...number[]];
const historico: HistoricoSemanal = ['Porto Velho', 32, 33, 34, 35, 31];

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AM'; // Cannot assign to '0' because it is a read-only property.
