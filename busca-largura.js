class CidadeRomenia {
    constructor(estado_inicial, objetivo, mapa_romenia) {
        this.estado_inicial = estado_inicial; // Cidade de origem
        this.objetivo = objetivo; // Cidade de destino
        this.mapa_romenia = mapa_romenia;   // Mapa das cidades
    }

    buscaLargura() {
        let fila = [this.estado_inicial]; // Fila de cidades a serem exploradas
        let visitados = new Set(); // Conjunto de cidades visitadas
        let caminho = [];

        while (fila.length > 0) {
            let cidadeAtual = fila.shift(); // Remove o primeiro nó da fila
            console.log(`Cidade visitada: ${cidadeAtual}`);

            caminho.push(cidadeAtual); // Adiciona cidade atual ao caminho

            if (cidadeAtual === this.objetivo) { // Se a cidade atual é o objetivo, termina a busca
                return {
                    resultado: `Chegou a ${cidadeAtual}, o objetivo foi encontrado!`,
                    caminho: `${caminho.join(' -> ')}`,
                }
            }

            visitados.add(cidadeAtual); // Marca cidade atual como visitada


            let vizinhos = this.mapa_romenia[cidadeAtual] || [];
            for (let vizinho of vizinhos) {
                if (!visitados.has(vizinho)) { // Verifica se o vizinho já foi visitado
                    visitados.add(vizinho);    // Marca o vizinho como visitado
                    fila.push(vizinho);       // Adiciona o vizinho à fila
                }
            }
        }

        return "Caminho não encontrado.";
    }
}

let mapa_romenia = {
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

let busca = new CidadeRomenia('Arad', 'Bucharest', mapa_romenia);
console.log(busca.buscaLargura());
