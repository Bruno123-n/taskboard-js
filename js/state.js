//state(dados)

//variáveis globais(tarefa, filtro...)
export let tarefas = []
export let filtroAtual = 'todas'
export let itemArrastado = null
export let termoBusca = ''
export let tarefaParaRemover = null


//acessa valor atual para poder mecher depois
export function setItemArrastado(valor) {
    itemArrastado = valor
}

export function setTermoBusca(valor) {
    termoBusca = valor
}

export function setFiltro(valor) {
    filtroAtual = valor
}

export function setTarefaParaRemover(id) {
    tarefaParaRemover = id
}