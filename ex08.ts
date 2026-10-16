export {};

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  return c;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
const camiseta: TamanhoCamiseta = 'M';
// const camisetaErro: TamanhoCamiseta = 'XG'; // Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte': return 25;
    case 'nordeste': return 20;
    case 'centro-oeste': return 18;
    case 'sudeste': return 12;
    case 'sul': return 15;
  }
}

const complemento: string | null = null;
const complementoStr = complemento ?? '(sem complemento)';

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

console.log(`Cliente: ${formatarCodigo(42)} | Camiseta: ${camiseta}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoStr}`);
console.log(`Frete para o sul: R$ ${calcularFrete('sul').toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);

/*
Reflexão:
- `const r = 'sul'` cria uma constante com tipo literal `'sul'`, que é compatível com os parâmetros literais de `calcularFrete`.
- `let r2 = 'sul'` sofre alargamento de tipo (`widening`), tornando-se do tipo `string`, o que impede a atribuição direta a parâmetros restritos por tipos literais específicos.
*/
