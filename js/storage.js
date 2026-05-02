//storage
// mexe com localStorage
import { tarefas } from './state.js'
import { filtroAtual } from './state.js'
import { setFiltro } from './state.js'
import { atualizarUI } from './uiController.js'

export function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}
export function carregarTarefas() {
    const dados = JSON.parse(localStorage.getItem('tarefas'))

    if (dados) {
        tarefas.length = 0
        tarefas.push(...dados)
    }
}

export function carregarFiltro() {
    const filtroSalvo = localStorage.getItem('filtro')

    if (filtroSalvo) {
        setFiltro(filtroSalvo)
    }
}