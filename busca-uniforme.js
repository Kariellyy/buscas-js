class CidadeRomenia {
    constructor(estado_inicial, objetivo, mapa_romenia) {
        this.estado_inicial = estado_inicial;
        this.objetivo = objetivo;
        this.mapa_romenia = mapa_romenia;
    }

    buscaUniforme() {
        let fila = [{ cidade: this.estado_inicial, custo: 0, caminho: [this.estado_inicial] }]; // Fila de cidades a serem exploradas
        let custos = { [this.estado_inicial]: 0 }; // Dicionário de custos
        let visitas = []; // Lista de visitas

        while (fila.length > 0) { // Enquanto houver cidades na fila
            fila.sort((a, b) => a.custo - b.custo); // Ordena a fila pelo custo
            let cidadeAtual = fila.shift(); // Remove o primeiro nó da fila

            // Registra a visita atual
            visitas.push(`Visitada: ${cidadeAtual.cidade} | Custo: ${cidadeAtual.custo} | Caminho: ${cidadeAtual.caminho.join(' -> ')}`); 

            // Verifica se o objetivo foi alcançado
            if (cidadeAtual.cidade === this.objetivo) {
                return {
                    resultado: `Objetivo alcançado: ${cidadeAtual.cidade}! Custo total: ${cidadeAtual.custo}`,
                    caminho: cidadeAtual.caminho.join(' -> '),
                    visitas
                };
            }

            let vizinhos = this.mapa_romenia[cidadeAtual.cidade] || {};
            for (let vizinho in vizinhos) {
                let novoCusto = cidadeAtual.custo + vizinhos[vizinho];
                if (custos[vizinho] === undefined || novoCusto < custos[vizinho]) {
                    custos[vizinho] = novoCusto;
                    fila.push({
                        cidade: vizinho,
                        custo: novoCusto,
                        caminho: [...cidadeAtual.caminho, vizinho]
                    });
                }
            }
        }

        return "Caminho não encontrado.";
    }
}

let mapa_romenia = {
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

let romenia = new CidadeRomenia('Arad', 'Bucharest', mapa_romenia);
console.log(romenia.buscaUniforme());
