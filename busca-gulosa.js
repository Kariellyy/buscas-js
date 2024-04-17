class FilaPrioridade {
    constructor() {
        this.elementos = [];
    }

    enfileirar(item, prioridade) {
        const novoElemento = { item, prioridade };
        let adicionado = false;
        for (let i = 0; i < this.elementos.length; i++) {
            if (prioridade < this.elementos[i].prioridade) {
                this.elementos.splice(i, 0, novoElemento);
                adicionado = true;
                break;
            }
        }
        if (!adicionado) {
            this.elementos.push(novoElemento);
        }
    }

    desenfileirar() {
        return this.elementos.shift().item;
    }

    estaVazia() {
        return this.elementos.length === 0;
    }
}

class CidadeRomenia {
    constructor(estado_inicial, objetivo, mapaRomenia, heuristica) {
        this.estado_inicial = estado_inicial;
        this.objetivo = objetivo;
        this.mapaRomenia = mapaRomenia;
        this.heuristica = heuristica;
    }

    buscaGulosa() {
        let filaPrioridade = new FilaPrioridade();
        let visitados = new Set();

        filaPrioridade.enfileirar({ cidade: this.estado_inicial, caminho: [this.estado_inicial] }, this.heuristica[this.estado_inicial]);

        while (!filaPrioridade.estaVazia()) {
            let { cidade, caminho } = filaPrioridade.desenfileirar();

            if (cidade === this.objetivo) {
                return {
                    resultado: `Chegou a ${cidade}, o objetivo foi encontrado!`,
                    caminho: caminho.join(' -> '),
                };
            }

            if (!visitados.has(cidade)) {
                visitados.add(cidade);

                let vizinhos = this.mapaRomenia[cidade];
                if (vizinhos) {
                    for (let vizinho of vizinhos) {
                        if (!visitados.has(vizinho)) {
                            let prioridade = this.heuristica[vizinho];
                            filaPrioridade.enfileirar({ cidade: vizinho, caminho: [...caminho, vizinho] }, prioridade);
                        }
                    }
                }
            }
        }
        return { resultado: "Caminho não encontrado." };
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

let heuristicaMapaRomenia = {
    'Arad': 366, 'Zerind': 374, 'Timisoara': 329, 'Lugoj': 244,
    'Mehadia': 241, 'Drobeta': 242, 'Craiova': 160, 'Rimnicu': 193,
    'Sibiu': 253, 'Fagaras': 176, 'Pitesti': 100, 'Bucharest': 0,
    'Giurgiu': 77, 'Urziceni': 80, 'Hirsova': 151, 'Eforie': 161,
    'Vaslui': 199, 'Iasi': 226, 'Neamt': 234
};

let cidadeRomenia = new CidadeRomenia('Arad', 'Bucharest', mapaRomenia, heuristicaMapaRomenia);
console.log(cidadeRomenia.buscaGulosa());
