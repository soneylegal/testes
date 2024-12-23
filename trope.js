class Tarefa {
    constructor(titulo, descricao, prazo, disciplina, tipo) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.prazo = prazo;
        this.disciplina = disciplina;
        this.status = "Pendente";
        this.tipo = tipo;
    }

    alterarStatus(novoStatus) {
        this.status = novoStatus;
    }

    detalhes() {
        return `
        ${this.titulo} (${this.status})
        Descrição: ${this.descricao}
        Prazo: ${this.prazo}
        Disciplina: ${this.disciplina}
        Tipo: ${this.tipo}`;
    }
}

class TarefaTeorica extends Tarefa {
    constructor(titulo, descricao, prazo, disciplina, numPaginas) {
        super(titulo, descricao, prazo, disciplina, "Teórica");
        this.numPaginas = numPaginas;
    }

    detalhes() {
        return `${super.detalhes()}
        Número de Páginas: ${this.numPaginas}`;
    }
}

class TarefaPratica extends Tarefa {
    constructor(titulo, descricao, prazo, disciplina, numExercicios) {
        super(titulo, descricao, prazo, disciplina, "Prática");
        this.numExercicios = numExercicios;
    }

    detalhes() {
        return `${super.detalhes()}
        Número de Exercícios: ${this.numExercicios}`;
    }
}

class TarefaRevisao extends Tarefa {
    constructor(titulo, descricao, prazo, disciplina, numRevisoes) {
        super(titulo, descricao, prazo, disciplina, "Revisão");
        this.numRevisoes = numRevisoes;
    }

    detalhes() {
        return `${super.detalhes()}
        Número de Revisões: ${this.numRevisoes}`;
    }
}

let listaTarefas = [];

function adicionarTarefa(tipo, titulo, descricao, prazo, disciplina, num) {
    let novaTarefa;

    if (tipo === "teorica") {
        novaTarefa = new TarefaTeorica(titulo, descricao, prazo, disciplina, num);
    } else if (tipo === "pratica") {
        novaTarefa = new TarefaPratica(titulo, descricao, prazo, disciplina, num);
    } else if (tipo === "revisao") {
        novaTarefa = new TarefaRevisao(titulo, descricao, prazo, disciplina, num);
    }

    listaTarefas.push(novaTarefa);
    exibirTarefas();
}

function exibirTarefas() {
    console.clear();
    console.log("Lista de Tarefas:");

    listaTarefas.forEach((tarefa, indice) => {
        console.log(`${indice + 1}. ${tarefa.detalhes()}`);
    });

    if (listaTarefas.length === 0) {
        console.log("Nenhuma tarefa na lista.");
    }
}

function alterarStatus(indice) {
    if (indice >= 0 && indice < listaTarefas.length) {
        listaTarefas[indice].alterarStatus("Concluída");
        exibirTarefas();
    } else {
        console.log("Índice inválido.");
    }
}

function removerTarefa(indice) {
    if (indice >= 0 && indice < listaTarefas.length) {
        listaTarefas.splice(indice, 1);
        exibirTarefas();
    } else {
        console.log("Índice inválido.");
    }
}

// Exemplo de uso no terminal
adicionarTarefa("teorica", "Estudar JavaScript", "Revisar conceitos de classes", "2024-12-31", "Programação", 20);
adicionarTarefa("pratica", "Criar uma API", "Implementar uma API RESTful", "2024-12-25", "Backend", 5);
adicionarTarefa("revisao", "Revisar Álgebra", "Resolver exercícios de revisão", "2024-12-20", "Matemática", 10);

exibirTarefas();

// Alterar status e remover tarefas como exemplo
alterarStatus(0);
removerTarefa(1);
exibirTarefas();
