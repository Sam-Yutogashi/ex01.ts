export {};

const paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'João Souza', telefone: '(69) 98888-1111' },
};

const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-11',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergiasStr = p.alergias && p.alergias.length > 0 
    ? `Alergias: ${p.alergias.join(', ')}` 
    : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergiasStr}`;
}

console.log(resumo(paciente1));
console.log(resumo(paciente2));

// Erros provocados:
// paciente1.cpf = '000.000.000-00'; // Cannot assign to 'cpf' because it is a read-only property.
// paciente1.peso = 70; // Property 'peso' does not exist on type '{ ... }'.

/*
Reflexão:
- `let dados: object = paciente1; dados.nome;` dá erro porque o tipo `object` representa valores que não são primitivos, mas ele não define quais propriedades o objeto possui. O compilador não sabe se `nome` existe em `object`.
- `let x: {} = 10;` é aceito porque o tipo `{}` (objeto vazio) engloba qualquer valor exceto `null` e `undefined` (incluindo tipos primitivos que possuem wrappers).
- `let y: object = 10;` dá erro porque o tipo `object` exclui expressamente tipos primitivos.
*/
