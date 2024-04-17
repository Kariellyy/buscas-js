// Classe Item para representar um item com nome, peso e valor
class Item {
    constructor(nome, peso, valor) {
        this.nome = nome;
        this.peso = peso;
        this.valor = valor;
    }

    // Método para calcular a razão valor/peso de um item
    razaoValorPorPeso() {
        return this.valor / this.peso;
    }
}

// Classe ProblemaMochila que representar o problema da mochila
class ProblemaMochila {
    constructor(itens, capacidadeMaxima) {
        this.itens = itens; 
        this.capacidadeMaxima = capacidadeMaxima; 
        this.solucao = []; 
    }

    // Método principal para executar a busca gulosa
    resolverProblema() {
        // Ordena os itens por sua razão valor/peso em ordem decrescente
        this.itens.sort((a, b) => b.razaoValorPorPeso() - a.razaoValorPorPeso());

        let pesoAtual = 0;

        // Itera sobre os itens ordenados
        for (const item of this.itens) {
            // Verifica se o item pode ser adicionado sem ultrapassar a capacidade máxima
            if (pesoAtual + item.peso <= this.capacidadeMaxima) {
                // Adiciona o item à solução
                this.solucao.push(item);
                // Atualiza o peso atual da solução
                pesoAtual += item.peso;
            }
        }

        return this.solucao;
    }

    // Soma o valor de todos os itens na solução.
    calcularValorTotal() {
        let valorTotal = 0; 
        for (let item of this.solucao) {
            valorTotal += item.valor; // Adiciona o valor de cada item ao total
        }
        return valorTotal; 
    }

    // Soma o peso de todos os itens na solução.
    calcularPesoTotal() {
        let pesoTotal = 0;
        for (let item of this.solucao) {
            pesoTotal += item.peso;
        }
        return pesoTotal; // Retorna o peso total calculado
    }
}

const coleteSalvaVidas = new Item("Colete salva-vidas", 3.0, 50);
const kitFerramentas = new Item("Kit de ferramentas", 4.0, 75);
const fogareiroPortatil = new Item("Fogareiro portátil", 2.5, 65);
const bastaoCaminhada = new Item("Bastão de caminhada", 2.0, 45);
const cadeiraDobravel = new Item("Cadeira dobrável", 3.0, 60);
const baldeDobravel = new Item("Balde dobrável", 1.5, 40);
const lataFeijao = new Item("Lata de feijão", 0.8, 30);
const lanternaCabeca = new Item("Lanterna de cabeça", 0.5, 25);
const livroOrientacao = new Item("Livro de orientação", 1.0, 15);
const cordaParaquedas = new Item("Corda de paraquedas", 1.0, 40);
const cantilAdicional = new Item("Cantil adicional", 0.7, 20);
const isqueiroProvaAgua = new Item("Isqueiro à prova d'água", 0.2, 10);
const sacoDormir = new Item("Saco de dormir", 1.5, 35);
const comidaEnlatada = new Item("Comida enlatada", 0.3, 20);
const kitPrimeirosSocorros = new Item("Kit de primeiros socorros", 1.5, 40);

const itens = [
    coleteSalvaVidas,
    kitFerramentas,
    fogareiroPortatil,
    bastaoCaminhada,
    cadeiraDobravel,
    baldeDobravel,
    lataFeijao,
    lanternaCabeca,
    livroOrientacao,
    cordaParaquedas,
    cantilAdicional,
    isqueiroProvaAgua,
    sacoDormir,
    comidaEnlatada,
    kitPrimeirosSocorros
];

const capacidadeMaxima = 10.0;

const problemaMochila = new ProblemaMochila(itens, capacidadeMaxima);
const solucao = problemaMochila.resolverProblema();

console.log()
console.log("____Objetos na mochila:____");
solucao.forEach(item => {
    console.log(`${item.nome} / ${item.peso}kg / Valor: R$${item.valor} / R$${item.razaoValorPorPeso().toFixed(2)} por kg.`);
});

console.log();
console.log("____Detalhes:_____");
console.log(`Peso total: ${problemaMochila.calcularPesoTotal()}kg.`);
console.log(`Valor total: R$${problemaMochila.calcularValorTotal()}.`);