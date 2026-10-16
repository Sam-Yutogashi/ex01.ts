export {};

const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const excecoes = ['da', 'de', 'do', 'das', 'dos'];
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  
  return palavras
    .map((palavra, index) => {
      const minuscula = palavra.toLowerCase();
      if (excecoes.includes(minuscula) && index > 0) {
        return minuscula;
      }
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

const clienteFormatado = formatarNome(nomeDigitado);
const precoLido = Number('12.40');
const quantidadeLida = parseInt('3un', 10);
const clienteFidelidade: boolean = true;

const subtotal = precoLido * quantidadeLida;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const total = subtotal - desconto;
const numeroCupom = String(42).padStart(6, '0');

const cupom = `CUPOM Nº ${numeroCupom}
Cliente: ${clienteFormatado}
Item: ${quantidadeLida} x R$ ${precoLido.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
