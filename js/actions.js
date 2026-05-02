//actions(muda dados)
//mexe em tarefa
// CRUD
import { tarefas } from './state.js'
import { getTarefaIndex, getTarefaById } from './helpers.js'
import { atualizarUI } from './uiController.js'
import { setFiltro } from './state.js'
import { mostrarToast } from './ui.js'
import { tarefaParaRemover } from './state.js'
import { fecharModal } from './ui.js'

const input = document.getElementById('inputTarefa')
const adicionar = document.getElementById('addBtn')

//função adicionar tarefa
export function adicionarTarefa() {
    const texto = input.value.trim()
    const prioridade = document.getElementById('prioridade').value
    if (!texto) return

    
    //cria objeto(dados)
    const tarefa = {//cria objeto tarefa
        id: Date.now(), //👈ID único
        texto,
        status: 'todo',
        editando: false,
        prioridade,
        criadaEm: new Date().toLocaleDateString('pt-BR')
    }
    
    tarefas.push(tarefa)
    tarefa._novaTemp = true
    
    atualizarUI()
    input.value = ''
    
    mostrarToast('Tarefa adicionada')
    atualizarBotaoAdicionar()
    
}

//função excluir que foi chamada no renderizar tarefas
export function removerTarefa(id) {
    const index = getTarefaIndex(id)
    if (index === null) return

    tarefas.splice(index, 1)
    

    mostrarToast('Tarefa removida')
    atualizarUI()
}

//função concluir que e chamada no renderizar tarefas
export function concluir(id) {
    const tarefa = getTarefaById(id)
    if (!tarefa) return

    tarefa.status = tarefa.status === 'done' ? 'todo' : 'done'

    mostrarToast(
        tarefa.status === 'done'
            ? 'Tarefa concluída'
            : 'Tarefa reaberta'
    )
    atualizarUI()
}

export function editarTarefa(id) {
    tarefas.forEach(t => t.editando = false)//limpa tudo

    const index = getTarefaIndex(id)
    if (index === null) return

    tarefas[index].editando = true
    atualizarUI()
}

export function salvarEdicao(id) {
    const input = document.querySelector(`input[data-id="${id}"]`)
    const texto = input.value.trim()
    if (!texto) return

    const index = tarefas.findIndex(t => t.id === id)

    tarefas[index].texto = texto
    tarefas[index].editando = false

    atualizarUI()
}

export function mudarFiltro(filtro) {
    setFiltro(filtro)

    localStorage.setItem('filtro', filtro) // 👈 salva certo

    atualizarUI()
}

export function limparConcluidas() {
    const pendentes = tarefas.filter(t => t.status !== 'done')

    tarefas.length = 0

    tarefas.push(...pendentes)
    
    atualizarUI()
}

export function alternarTema() {
    document.body.classList.toggle('dark')


    const temaDark = document.body.classList.contains('dark')
    

    localStorage.setItem('temaDark', temaDark)
}

export function carregarTema() {
    const temaSalvo = localStorage.getItem('temaDark')

    if (temaSalvo === 'true') {
        document.body.classList.add('dark')
    }
}

export function confirmarRemocao() {
    removerTarefa(tarefaParaRemover)
    fecharModal()
}

export function atualizarBotaoAdicionar() {
    adicionar.disabled = !input.value.trim()
}
