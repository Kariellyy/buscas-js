class CidadeRomenia {
    constructor(estadoInicial, objetivo, mapaRomenia) {
        this.estadoInicial = estadoInicial;
        this.objetivo = objetivo;
        this.mapaRomenia = mapaRomenia;
    }

    buscaProfundidadeLimitada(estadoInicial, objetivo, limiteProfundidade, caminho) {
        let pilha = []; // Pilha de cidades a serem exploradas
        let visitados = new Set(); // Conjunto de cidades visitadas
        let profundidade = 0; // Profundidade inicial

        pilha.push({ cidade: estadoInicial, profundidade: profundidade }); // Adiciona a cidade inicial e a profundidade à pilha
        visitados.add(estadoInicial); // Marca a cidade inicial como visitada

        while (pilha.length > 0) {
            let { cidade, profundidade } = pilha.pop(); // Remove o último nó da pilha
            console.log(`Explorando: ${cidade}`); // Exibe a cidade atual

            caminho.push(cidade); // Adiciona cidade atual ao caminho

            if (cidade === objetivo) { // Se a cidade atual é o objetivo, termina a busca
                return { encontrado: true, caminhoObjetivo: caminho };
            }

            if (profundidade >= limiteProfundidade) { // Se a profundidade for maior ou igual ao limite, termina a busca
                continue;
            }

            let vizinhos = this.mapaRomenia[cidade] || []; // Vizinhos da cidade atual
            for (let vizinho of vizinhos) {
                if (!visitados.has(vizinho)) { // Verifica se o vizinho já foi visitado
                    pilha.push({ // Adiciona o vizinho à pilha
                        cidade: vizinho,
                        profundidade: profundidade + 1
                    });
                    visitados.add(vizinho); // Marca o vizinho como visitado
                }
            }
        }
        return false;
    }

    buscaAprofundamentoIterativo(estadoInicial, objetivo) { // Busca em profundidade iterativa
        let profundidade = 0;
        let caminho = [];

        while (true) {
            console.log("==================== Cidades Visitadas ====================")
            console.log(`Limite: ${profundidade}`); // Exibe o limite de profundidade
            const { encontrado, caminhoObjetivo } = this.buscaProfundidadeLimitada(estadoInicial, objetivo, profundidade, []);

            caminho = caminhoObjetivo; // Atualiza o caminho

            if (encontrado) { // Se o objetivo foi encontrado, termina a busca
                return {
                    resultado: `Objetivo encontrado: ${objetivo}`,
                    profundidade: `Com a profundidade de limite ${profundidade}`,
                    // mostrar caminho
                    caminho: caminho.join(' -> ')
                };
            } else { // Se o objetivo não foi encontrado, incrementa a profundidade
                profundidade++;
            }
        }
    }
}

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

let romenia = new CidadeRomenia('Arad', 'Bucharest', mapaRomenia);
console.log(romenia.buscaAprofundamentoIterativo('Arad', 'Bucharest'));
