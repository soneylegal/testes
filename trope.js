const prompt = require('prompt-sync')({ sigint: true });

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

function adicionarTarefa() {
    const tipo = prompt("Tipo da tarefa (teorica/pratica/revisao): ").toLowerCase();
    const titulo = prompt("Título: ");
    const descricao = prompt("Descrição: ");
    const prazo = prompt("Prazo: ");
    const disciplina = prompt("Disciplina: ");
    const num = prompt(`Número (${tipo === "teorica" ? "Páginas" : tipo === "pratica" ? "Exercícios" : "Revisões"}): `);

    let novaTarefa;
    if (tipo === "teorica") {
        novaTarefa = new TarefaTeorica(titulo, descricao, prazo, disciplina, parseInt(num));
    } else if (tipo === "pratica") {
        novaTarefa = new TarefaPratica(titulo, descricao, prazo, disciplina, parseInt(num));
    } else if (tipo === "revisao") {
        novaTarefa = new TarefaRevisao(titulo, descricao, prazo, disciplina, parseInt(num));
    } else {
        console.log("Tipo inválido!");
        return;
    }

    listaTarefas.push(novaTarefa);
    console.log("Tarefa adicionada com sucesso!");
}

function exibirTarefas() {
    if (listaTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("Lista de Tarefas:");
    listaTarefas.forEach((tarefa, indice) => {
        console.log(`\n${indice + 1}. ${tarefa.detalhes()}`);
    });
}

function alterarStatus() {
    exibirTarefas();
    const indice = parseInt(prompt("Informe o número da tarefa para alterar o status: ")) - 1;

    if (indice >= 0 && indice < listaTarefas.length) {
        listaTarefas[indice].alterarStatus("Concluída");
        console.log("Status alterado para 'Concluída'.");
    } else {
        console.log("Índice inválido.");
    }
}

function editarTarefa() {
    exibirTarefas();
    const indice = parseInt(prompt("Informe o número da tarefa para editar: ")) - 1;

    if (indice >= 0 && indice < listaTarefas.length) {
        const titulo = prompt("Novo Título (deixe vazio para manter): ");
        const descricao = prompt("Nova Descrição (deixe vazio para manter): ");
        const prazo = prompt("Novo Prazo (deixe vazio para manter): ");
        const disciplina = prompt("Nova Disciplina (deixe vazio para manter): ");

        if (titulo) listaTarefas[indice].titulo = titulo;
        if (descricao) listaTarefas[indice].descricao = descricao;
        if (prazo) listaTarefas[indice].prazo = prazo;
        if (disciplina) listaTarefas[indice].disciplina = disciplina;

        console.log("Tarefa editada com sucesso!");
    } else {
        console.log("Índice inválido.");
    }
}

function removerTarefa() {
    exibirTarefas();
    const indice = parseInt(prompt("Informe o número da tarefa para remover: ")) - 1;

    if (indice >= 0 && indice < listaTarefas.length) {
        listaTarefas.splice(indice, 1);
        console.log("Tarefa removida com sucesso!");
    } else {
        console.log("Índice inválido.");
    }
}

function menu() {
    while (true) {
        console.log("\n--- Gerenciador de Tarefas ---");
        console.log("1. Adicionar Tarefa");
        console.log("2. Exibir Tarefas");
        console.log("3. Alterar Status");
        console.log("4. Editar Tarefa");
        console.log("5. Remover Tarefa");
        console.log("6. Sair");

        const opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                adicionarTarefa();
                break;
            case "2":
                exibirTarefas();
                break;
            case "3":
                alterarStatus();
                break;
            case "4":
                editarTarefa();
                break;
            case "5":
                removerTarefa();
                break;
            case "6":
                console.log("Saindo...");
                return;
            default:
                console.log("Opção inválida!");
        }
    }
}

menu();
