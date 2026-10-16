export {};

const itens = [
  { nome: 'Arroz 5kg', preco: 28.90, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.90, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.50, quantidade: 1 },
];

const nomes: string[] = itens.map(i => i.nome);
const caros: string[] = itens.filter(i => i.preco > 10.00).map(i => i.nome);
const total: number = itens.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Outros'); // Property 'push' does not exist on type 'readonly string[]'.

const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const totalDespensa = despensa.flat().reduce((acc, n) => acc + n, 0);

const [primeiro, segundo] = itens;
const novaLista = [...itens, { nome: 'Azeite', preco: 25.00, quantidade: 1 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${totalDespensa}`);
