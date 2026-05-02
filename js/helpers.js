//helpers (Assistente de Tarefas)
import { tarefas, termoBusca, filtroAtual } from './state.js'

export function getTarefaIndex(id) {
    const index = tarefas.findIndex(t => t.id === id)
    return index === -1 ? null : index
}

export function getTarefaById(id){
    return tarefas.find(t => t.id === id)
}

export function filtrarTarefa(tarefa) {
    if (filtroAtual === 'pendentes' && tarefa.status === 'done') return false
    if (filtroAtual === 'concluidas' && tarefa.status !== 'done') return false
    if (!tarefa.texto.toLowerCase().includes(termoBusca)) return false

    return true
}

 //codição para caso nao encontre nenhuma tarefa
    if (tarefas.length === 0) {
        document.getElementById('todo').innerHTML = 
            `<p class="empty">Nenhuma tarefa encontrada 👀</p>`
    }

export function ordenarPrioridade(a, b) {
    const prioridades = {
    alta: 1,
    media: 2,
    baixa: 3
    }

    return prioridades[a.prioridade] - prioridades[b.prioridade]
}