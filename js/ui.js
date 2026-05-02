//ui(mostra)
// mexe na tela
import { tarefas } from './state.js'
import { setItemArrastado } from './state.js'
import { filtrarTarefa, ordenarPrioridade } from './helpers.js'
import { filtroAtual } from './state.js'





export function renderizarTarefas() {
    const colunas ={
        todo : document.getElementById('todo'),
        doing : document.getElementById('doing'),
        done : document.getElementById('done')
    }
    Object.values(colunas).forEach(col => col.innerHTML = '')
    
    
    tarefas
        .filter(filtrarTarefa)
        .sort(ordenarPrioridade)
        .forEach(tarefa => {
            const li = criarElementoTarefa(tarefa)
            colunas[tarefa.status].appendChild(li)
        })

        
        
        
        // foco no input de edição
        const inputEdit = document.querySelector('.edit-input')
        if (inputEdit) inputEdit.focus()

        document.querySelectorAll('.filtros button').forEach(btn => {
            btn.classList.remove('ativo')

            if (btn.dataset.filtro === filtroAtual) {
                btn.classList.add('ativo')
            }
})    
    if (tarefas.length === 0) {
    document.getElementById('todo').innerHTML = '<p class="empty">Sem tarefas</p>'
}    

    
    atualizarContador()
    contadorDeColunas()
}

export function criarElementoTarefa(tarefa) {
     //cria elemento 'li'
    const li = document.createElement('li')
    li.classList.add(`prioridade-${tarefa.prioridade}`)
    li.setAttribute('draggable', true)
    //drag
    
    li.addEventListener('dragstart', () => {
        setItemArrastado(tarefa.id)
        li.classList.add('dragging')
    })
    

    li.addEventListener('dragend', () => {
        setItemArrastado(null)
        li.classList.remove('dragging')
    })
    
    //HTML
    li.innerHTML = tarefa.editando ? `
        <input
            type="text"
            value="${tarefa.texto}"
            data-id="${tarefa.id}"
            class="edit-input"
        >
        <button data-acao="salvar" data-id="${tarefa.id}">💾</button>
    ` : `
        <span class="badge-prioridade ${tarefa.prioridade}">
            ${tarefa.prioridade}
        </span>
        <span>${tarefa.texto}</span>
        <div>
            <button class="btn-concluir" data-acao="concluir" data-id="${tarefa.id}">✔</button>
            <button class="btn-remover" data-acao="remover" data-id="${tarefa.id}">X</button>
            <button class="btn-editar" data-acao="editar" data-id="${tarefa.id}">✏️</button>
        </div>
    `

    if (tarefa._novaTemp) {
            li.classList.add('nova')

            setTimeout(() => {
                // li.classList.remove('nova')
                tarefa._novaTemp = false
            }, 500)
        }
    

    return li

    

}

const contador = document.getElementById('contador')

export function atualizarContador() {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.status === 'done').length

    contador.textContent = `${concluidas} de ${total} concluídas`
}

export function contadorDeColunas() {
    const tituloTodo = document.getElementById('tituloTodo')
    const tituloDoing = document.getElementById('tituloDoing')
    const tituloDone = document.getElementById('tituloDone')

    const fazer = tarefas.filter(t => t.status === 'todo').length

    const fazendo = tarefas.filter(t => t.status === 'doing').length

    const concluido = tarefas.filter(t => t.status === 'done').length

    tituloTodo.textContent = `A fazer (${fazer})`  

    tituloDoing.textContent = `Fazendo (${fazendo})`  

    tituloDone.textContent = `Concluído (${concluido})`

}

export function mostrarToast(mensagem) {
    const toast = document.getElementById('toast')

    toast.textContent = mensagem
    toast.classList.add('show')
    
    setTimeout(() => {
        toast.classList.remove('show')
    },3000)

    
}

const modal = document.getElementById('modal')

export function abrirModal() {
    
    modal.classList.remove('hidden')

}

export function fecharModal() {

    modal.classList.add('hidden')
}


