class CidadeRomenia {
    constructor(estado_inicial, objetivo, mapaRomenia) {
        this.estado_inicial = estado_inicial;
        this.objetivo = objetivo;
        this.mapaRomenia = mapaRomenia;
    }

    buscaLimitada(estadoInicial, objetivo, limiteProfundidade, caminho = []) {
        let pilha = []; // Pilha de cidades a serem exploradas
        let visitados = new Set(); // Conjunto de cidades visitadas

        pilha.push({ cidade: estadoInicial, profundidade: 0, caminho: [estadoInicial] }); // Adiciona cidade inicial à pilha
        visitados.add(estadoInicial); // Marca a cidade inicial como visitada

        console.log("==================== Cidades Visitadas ====================");
        while (pilha.length > 0) {
            let { cidade, profundidade, caminho } = pilha.pop(); // Remove o último nó da pilha
            console.log(`Cidade visitada: ${cidade}`);

            if (cidade === objetivo) { // Se a cidade atual é o objetivo, termina a busca
                return {
                    resultado: `Chegou a ${cidade} no limite de profundidade ${profundidade}. O objetivo foi encontrado!`,
                    caminho: caminho.join(' -> ') // Apresenta o caminho percorrido
                };
            }

            if (profundidade <= limiteProfundidade) { // Verifica se a profundidade é menor que o limite
                let vizinhos = this.mapaRomenia[cidade] || []; // Vizinhos da cidade atual
                for (let vizinho of vizinhos) {
                    if (!visitados.has(vizinho)) { // Verifica se o vizinho já foi visitado
                        pilha.push({ // Adiciona o vizinho à pilha para exploração futura
                            cidade: vizinho,
                            profundidade: profundidade + 1,
                            caminho: [...caminho, vizinho] // Adiciona vizinho ao caminho
                        });
                        visitados.add(vizinho); // Marca o vizinho como visitado
                    }
                }
            }
        }
        return { resultado: 'Não foi possível encontrar o objetivo dentro do limite de profundidade.' };
    }
}

// Definição do mapa da Romênia com as conexões entre as cidades
let mapaRomenia = {
    'Arad': ['Zerind', 'Sibiu', 'Timisoara'],
    'Zerind': ['Arad', 'Oradea'],
    'Timisoara': ['Arad', 'Lugoj'],
    'Lugoj': ['Timisoara', 'Mehadia'],
    'Mehadia': ['Lugoj', 'Drobeta'],
    'Drobeta': ['Mehadia', 'Craiova'],
    'Craiova': ['Drobeta', 'Rimnicu', 'Pitesti'],
    'Rimnicu': ['Sibiu', 'Craiova', 'Pitesti'],
    'Sibiu': ['Arad', 'Fagaras', 'Rimnicu'],
    'Fagaras': ['Sibiu', 'Bucharest'],
    'Pitesti': ['Rimnicu', 'Craiova', 'Bucharest'],
    'Bucharest': ['Fagaras', 'Pitesti', 'Giurgiu', 'Urziceni'],
    'Giurgiu': ['Bucharest'],
    'Urziceni': ['Bucharest', 'Vaslui', 'Hirsova'],
    'Hirsova': ['Urziceni', 'Eforie'],
    'Eforie': ['Hirsova'],
    'Vaslui': ['Urziceni', 'Iasi'],
    'Iasi': ['Vaslui', 'Neamt'],
    'Neamt': ['Iasi']
};

// Criação do objeto e chamada da função de busca
let busca = new CidadeRomenia('Arad', 'Bucharest', mapaRomenia);
console.log(busca.buscaLimitada('Arad', 'Bucharest', 5)); // Inicia a busca com limite de profundidade 5
