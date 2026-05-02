// events(escuta clique)
// mexe com evento
import { 
    adicionarTarefa,
    concluir,
    editarTarefa,
    salvarEdicao,
    confirmarRemocao,
    mudarFiltro,
    limparConcluidas,
    alternarTema
} from "./actions.js"
import { tarefas, itemArrastado, setTarefaParaRemover } from './state.js'
import { setTermoBusca } from "./state.js"
import { atualizarUI } from './uiController.js'
import { abrirModal, fecharModal, renderizarTarefas } from './ui.js'
import { atualizarBotaoAdicionar } from './actions.js'




const adicionar = document.getElementById('addBtn')
const inputBusca = document.getElementById('busca')
const input = document.getElementById('inputTarefa')
const toggleTema = document.getElementById('toggleTema')

export function configurarEventos(){
    //evento adicionar tarefa
    adicionar.addEventListener('click', adicionarTarefa)

    input.addEventListener('input', atualizarBotaoAdicionar)

    function enterAdicionarTarefa() {

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                adicionarTarefa()
            }
        })
    }

    //evento input
    inputBusca.addEventListener('input', (e) => {
        setTermoBusca(e.target.value.toLowerCase())
        renderizarTarefas()
    })

    //Event Delegation (delegação de evento)
    document.querySelector('.board').addEventListener("click", (e) => {
        const botao = e.target
        

        if (botao.tagName !== 'BUTTON') return
        
        const acao = botao.dataset.acao 
        // "remover, concluir"
        const id = Number(botao.dataset.id)
        // "1" usa o number pra converter o tipo

        if (acao === 'concluir') concluir(id)
        

        if (acao === 'remover') {
            console.log('clicou remover')

            setTarefaParaRemover(id)
            abrirModal()
        }
        

        if (acao === 'editar') editarTarefa(id)
        
        if (acao === 'salvar') salvarEdicao(id)
        
    })

    document
        .getElementById('confirmarRemocao')
        .addEventListener('click', confirmarRemocao)

    document
    .getElementById('cancelarRemocao')
    .addEventListener('click', fecharModal)

    document.querySelectorAll('.filtros button').forEach(btn => {
        btn.addEventListener('click', () => {
            mudarFiltro(btn.dataset.filtro)
        })
    })

    document.getElementById('limparConcluidas')
    .addEventListener('click', limparConcluidas)

    //dark (mode)
    toggleTema.addEventListener('click', alternarTema)

    enterAdicionarTarefa()
}

export function configuracaoDragDrop() {
    document.querySelectorAll('.coluna').forEach(coluna => {

        coluna.addEventListener('dragover', (e) => {
            e.preventDefault()
            coluna.classList.add('drag-over-coluna') // 👈 adiciona estilo
        })

        coluna.addEventListener('dragleave', () => {
            coluna.classList.remove('drag-over-coluna') // 👈 remove ao sair
        })

        coluna.addEventListener('drop', (e) => {
            e.preventDefault()
            coluna.classList.remove('drag-over-coluna') // 👈 limpa estilo

            const tarefa = tarefas.find(t => t.id === itemArrastado)
            if (!tarefa) return

            tarefa.status = coluna.dataset.status

            atualizarUI()
        })
    })
}



//muda estado → então vai no actions