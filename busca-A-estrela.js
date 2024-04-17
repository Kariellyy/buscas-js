// Definição da classe FilaPrioridade para gerenciar a fila de elementos com prioridades
class FilaPrioridade {
    constructor() {
        this.elementos = []; // Inicializa um array vazio para armazenar os elementos da fila
    }

    // Método para adicionar um elemento à fila com uma dada prioridade
    enfileirar(item, prioridade) {
        const novoElemento = { item, prioridade }; // Cria um objeto para o novo elemento
        let adicionado = false; // Para verificar se o elemento foi adicionado
        // Loop para encontrar a posição correta com base na prioridade
        for (let i = 0; i < this.elementos.length; i++) {
            if (prioridade < this.elementos[i].prioridade) { // Compara as prioridades
                this.elementos.splice(i, 0, novoElemento); // Insere o elemento na posição correta
                adicionado = true;
                break;
            }
        }
        if (!adicionado) {
            this.elementos.push(novoElemento); // Adiciona ao final se não encontrar uma prioridade menor
        }
    }

    // Método para remover e retornar o elemento de maior prioridade (menor valor de prioridade)
    desenfileirar() {
        return this.elementos.shift().item; // Remove e retorna o primeiro elemento da lista
    }

    // Método para verificar se a fila está vazia
    estaVazia() {
        return this.elementos.length === 0; // Retorna true se a fila estiver vazia
    }
}

// Definição da classe CidadeRomenia para representar o problema do mapa da Romênia
class CidadeRomenia {
    constructor(estado_inicial, objetivo, mapaRomenia, heuristica) {
        this.estado_inicial = estado_inicial; // Estado inicial do problema
        this.objetivo = objetivo; // Objetivo ou destino final
        this.mapaRomenia = mapaRomenia; // Mapa contendo as cidades e suas conexões
        this.heuristica = heuristica; // Heurística (estimativa de custo até o objetivo)
    }

    // Método que implementa o algoritmo de busca A*
    buscaAEstrela() {
        let filaPrioridade = new FilaPrioridade(); // Cria uma nova fila de prioridades
        let visitados = new Set(); // Conjunto para armazenar as cidades já visitadas
        let custos = { [this.estado_inicial]: 0 }; // Dicionário para armazenar os custos acumulados

        // Adiciona o estado inicial à fila de prioridades com sua heurística como prioridade
        filaPrioridade.enfileirar({ cidade: this.estado_inicial, caminho: [this.estado_inicial] }, this.heuristica[this.estado_inicial]);

        // Loop enquanto houver elementos na fila de prioridades
        while (!filaPrioridade.estaVazia()) {
            let { cidade, caminho } = filaPrioridade.desenfileirar(); // Desenfileira o elemento com maior prioridade

            if (cidade === this.objetivo) { // Verifica se a cidade atual é o objetivo
                // Retorna o resultado com o caminho encontrado e o custo total
                return {
                    resultado: `Chegou a ${cidade}, o objetivo foi encontrado!`,
                    caminho: `${caminho.join(' -> ')}`,
                    custos: `Custo total: ${custos[cidade]}`
                };
            }

            if (!visitados.has(cidade)) { // Verifica se a cidade ainda não foi visitada
                visitados.add(cidade); // Marca a cidade como visitada

                // Itera sobre os vizinhos da cidade atual no mapa
                for (let vizinho in this.mapaRomenia[cidade]) {
                    let novoCusto = custos[cidade] + this.mapaRomenia[cidade][vizinho]; // Calcula o novo custo para o vizinho
                    if (!custos[vizinho] || novoCusto < custos[vizinho]) { // Verifica se é um caminho mais barato
                        custos[vizinho] = novoCusto; // Atualiza o custo para o vizinho
                        let prioridade = novoCusto + this.heuristica[vizinho]; // Calcula a nova prioridade com base na heurística
                        filaPrioridade.enfileirar({ cidade: vizinho, caminho: [...caminho, vizinho] }, prioridade); // Enfileira o vizinho com a nova prioridade
                    }
                }
            }
        }
        return { resultado: "Caminho não encontrado." }; // Retorna um resultado negativo se o caminho não for encontrado
    }
}

let mapaRomenia = {
    'Arad': { 'Zerind': 75, 'Sibiu': 140, 'Timisoara': 118 },
    'Zerind': { 'Arad': 75, 'Oradea': 71 },
    'Timisoara': { 'Arad': 118, 'Lugoj': 111 },
    'Lugoj': { 'Timisoara': 111, 'Mehadia': 70 },
    'Mehadia': { 'Lugoj': 70, 'Drobeta': 75 },
    'Drobeta': { 'Mehadia': 75, 'Craiova': 120 },
    'Craiova': { 'Drobeta': 120, 'Rimnicu': 146, 'Pitesti': 138 },
    'Rimnicu': { 'Sibiu': 80, 'Craiova': 146, 'Pitesti': 97 },
    'Sibiu': { 'Arad': 140, 'Fagaras': 99, 'Rimnicu': 80 },
    'Fagaras': { 'Sibiu': 99, 'Bucharest': 211 },
    'Pitesti': { 'Rimnicu': 97, 'Craiova': 138, 'Bucharest': 101 },
    'Bucharest': { 'Fagaras': 211, 'Pitesti': 101, 'Giurgiu': 90, 'Urziceni': 85 },
    'Giurgiu': { 'Bucharest': 90 },
    'Urziceni': { 'Bucharest': 85, 'Vaslui': 142, 'Hirsova': 98 },
    'Hirsova': { 'Urziceni': 98, 'Eforie': 86 },
    'Eforie': { 'Hirsova': 86 },
    'Vaslui': { 'Urziceni': 142, 'Iasi': 92 },
    'Iasi': { 'Vaslui': 92, 'Neamt': 87 },
    'Neamt': { 'Iasi': 87 }
};

let heuristicaMapaRomenia = {
    'Arad': 366,
    'Zerind': 374,
    'Timisoara': 329,
    'Lugoj': 244,
    'Mehadia': 241,
    'Drobeta': 242,
    'Craiova': 160,
    'Rimnicu': 193,
    'Sibiu': 253,
    'Fagaras': 176,
    'Pitesti': 100,
    'Bucharest': 0,
    'Giurgiu': 77,
    'Urziceni': 80,
    'Hirsova': 151,
    'Eforie': 161,
    'Vaslui': 199,
    'Iasi': 226,
    'Neamt': 234
};

let cidadeRomenia = new CidadeRomenia('Arad', 'Bucharest', mapaRomenia, heuristicaMapaRomenia);
console.log(cidadeRomenia.buscaAEstrela());
