// // ESTADO


// let tarefas = []
// let filtroAtual = 'todas'
// let itemArrastado = null
// let termoBusca = ''
// //--------------------------------------------------------------

// //addBtn, inputTarefa, lista
// const adicionar = document.getElementById('addBtn')
// const input = document.getElementById('inputTarefa')
// const inputBusca = document.getElementById('busca')

// // EVENTOS


// //evento adicionar tarefa
// adicionar.addEventListener('click', adicionarTarefa)

// //evento input
// inputBusca.addEventListener('input', (e) => {
//     termoBusca = e.target.value.toLowerCase()
//     renderizarTarefas()
// })

// //Event Delegation (delegação de evento)
// document.querySelector('.board').addEventListener("click", (e) => {
//     const botao = e.target
    

//     if (botao.tagName !== 'BUTTON') return
    
//     const acao = botao.dataset.acao 
//     // "remover, concluir"
//     const id = Number(botao.dataset.id)
//     // "1" usa o number pra converter o tipo

//     if (acao === 'concluir') {
//         concluir(id)
//     }

//     if (acao === 'remover') {
//         removerTarefa(id)
//     }

//     if (acao === 'editar') {
//         editarTarefa(id)
//     }
//     if (acao === 'salvar') {
//         salvarEdicao(id)
//     }
// })

// document.querySelectorAll('.filtros button').forEach(btn => {
//     btn.addEventListener('click', () => {
//         mudarFiltro(btn.dataset.filtro, btn)
//     })
// })

// //--------------------------------------------------------------

// // AÇÕES ( CRUD )


// //função adicionar tarefa
// function adicionarTarefa(){
//     const texto = input.value.trim()
//     if (!texto) return
    
//     //cria objeto(dados)
//     const tarefa = {
//         id: Date.now(), //👈ID único
//         texto: texto,
//         status: 'todo',
//         editando: false
//     }
    
//     tarefas.push(tarefa)
//     tarefa._novaTemp = true
    
//     atualizarUI()
//     input.value = ''
    
//     //_novaTemp =>  usar highligh  (animar nova tarefa)
// }

// //função excluir que foi chamada no renderizar tarefas
// function removerTarefa(id) {
//     const index = getTarefaIndex(id)
//     if (index === null) return

//     const confirmar = confirm('Deseja remover essa tarefa')
//     if (!confirmar) return

//     tarefas.splice(index, 1)

//     atualizarUI()
// }

// //função editar tarefa
// function editarTarefa(id) {
//     tarefas.forEach(t => t.editando = false)//limpa tudo

//     const index = getTarefaIndex(id)
//     if (index === null) return

//     tarefas[index].editando = true
//     atualizarUI()
// }

// //função concluir que e chamada no renderizar tarefas
// function concluir(id){
//     const tarefa = getTarefaById(id)
//     if (!tarefa) return

//     tarefa.status = tarefa.status === 'done' ? 'todo' : 'done'

//     atualizarUI()
// }

// function salvarEdicao(id) {
//     const input = document.querySelector(`input[data-id="${id}"]`)
//     const texto = input.value.trim()
//     if (!texto) return

//     const index = tarefas.findIndex(t => t.id === id)

//     tarefas[index].texto = texto
//     tarefas[index].editando = false

//     atualizarUI()
// }

// // UI ( RENDER )


// function renderizarTarefas() {
//     const colunas ={
//         todo : document.getElementById('todo'),
//         doing : document.getElementById('doing'),
//         done : document.getElementById('done')
//     }
//     Object.values(colunas).forEach(col => col.innerHTML = '')
        
//     tarefas
//         .filter(filtrarTarefa)
//         .forEach(tarefa => {
//             const li = criarElementoTarefa(tarefa)
//             colunas[tarefa.status].appendChild(li)
//         })
            
            
            
//         // })
        
//         // foco no input de edição
//         const inputEdit = document.querySelector('.edit-input')
//         if (inputEdit) inputEdit.focus()

//         atualizarContador()

// }

// function criarElementoTarefa(tarefa) {

//     //cria elemento 'li'
//     const li = document.createElement('li')
//     li.setAttribute('draggable', true)
//     //drag
    
//     li.addEventListener('dragstart', () => {
//         itemArrastado = tarefa.id
//         li.classList.add('dragging')
//     })
    
//     li.addEventListener('dragend', () => {
//         itemArrastado = null
//         li.classList.remove('dragging')
//     })
    
//     //HTML
//     li.innerHTML = tarefa.editando ? `
//         <input
//             type="text"
//             value="${tarefa.texto}"
//             data-id="${tarefa.id}"
//             class="edit-input"
//         >
//         <button data-acao="salvar" data-id="${tarefa.id}">💾</button>
//     ` : `
//         <span>${tarefa.texto}</span>
//         <div>
//             <button data-acao="concluir" data-id="${tarefa.id}">✔</button>
//             <button data-acao="remover" data-id="${tarefa.id}">X</button>
//             <button data-acao="editar" data-id="${tarefa.id}">✏️</button>
//         </div>
//     `

//     return li

// }

// const contador = document.getElementById('contador')

// function atualizarContador() {
//     const total = tarefas.length
//     const concluidas = tarefas.filter(t => t.status === 'done').length

//     contador.textContent = `${concluidas} de ${total} concluídas`
// }

// // HELPERS (assistente ou ferramenta que facilita a execução de tarefas específicas, especialmente em contextos técnicos e de programação)


// function getTarefaIndex(id) {
//     const index = tarefas.findIndex(t => t.id === id)

//     if (index === -1) {
//         console.warn('Tarefa não encontrada:', id)
//         return null
//     }

//     return index
// }

// function getTarefaById(id) {
//     return tarefas.find(t => t.id === id)
// }

// function filtrarTarefa(tarefa){
//     if (filtroAtual === 'pendentes' && tarefa.status === 'done') return false
//     if (filtroAtual === 'concluidas' && tarefa.status !== 'done') return false

//     if (!tarefa.texto.toLowerCase().includes(termoBusca)) return false

//     return true
// }

// // DRAG ( permitem criar interfaces interativas de "arrastar e soltar" (drag-and-drop) )


// function configuracaoDragDrop(){
//     document.querySelectorAll('.coluna').forEach(coluna => {

//         coluna.addEventListener('dragover', (e) => {
//             e.preventDefault()
//             coluna.classList.add('drag-over-coluna') // 👈 adiciona estilo
//         })

//         coluna.addEventListener('dragleave', () => {
//             coluna.classList.remove('drag-over-coluna') // 👈 remove ao sair
//         })

//         coluna.addEventListener('drop', (e) => {
//             e.preventDefault()
//             coluna.classList.remove('drag-over-coluna') // 👈 limpa estilo

//             const tarefa = tarefas.find(t => t.id === itemArrastado)
//             if (!tarefa) return

//             tarefa.status = coluna.dataset.status

//             atualizarUI()
//         })
//     })
// }



// function mudarFiltro(filtro,el) {
//     filtroAtual = filtro
//     document.querySelectorAll('.filtros button').forEach(btn => btn.classList.remove('ativo'))

//     el.classList.add('ativo')

//     atualizarUI()
// }

// function salvarTarefas() {
//     localStorage.setItem('tarefas', JSON.stringify(tarefas))
// }

// function carregarTarefas() {
//     const dados = localStorage.getItem('tarefas')

//     if (dados) {
//         tarefas =JSON.parse(dados)

//         tarefas.forEach(t => {
//             if (!t.status) {
//                 t.status = t.concluida ? 'done' : 'todo'
//             }
//         })
//     }
// }


// document.addEventListener('keydown', (e) => {
//     //salvar com enter
//     if (e.key === 'Enter') {
//         const inputEdit = document.querySelector('.edit-input')
//         if (inputEdit) {
//             const id = Number(inputEdit.dataset.id)
//             salvarEdicao(id)
//         }
//     }
//     //cancela com ESC
//     if (e.key === 'Escape') {
//         tarefas.forEach(t => t.editando = false)
//         atualizarUI()
//     }
// })

// // document.querySelectorAll('.coluna').forEach(coluna => {
// //     coluna.addEventListener('dragover', (e) => {
// //         e.preventDefault()
// //         coluna.classList.add('drag-over-coluna')
// //     })

// //     coluna.addEventListener('dragleave', () => {
// //         coluna.classList.remove('drag-over-coluna')
// //     })
// //     coluna.addEventListener('drop', (e) => {
// //         e.preventDefault()
// //         coluna.classList.remove('drag-over-coluna')

// //         const tarefa = tarefas.find(t => t.id === itemArrastado)
// //         if (!tarefa) return

// //         tarefa.status = coluna.dataset.status


// //         salvarTarefas()
// //         renderizarTarefas()
// //     })

// // })



// // organização de chamadas de funções( ORQUESTRADOR)
// function atualizarUI() {
//     salvarTarefas()
//     renderizarTarefas()
//     configuracaoDragDrop()
// }


// // function getPosicaoDepois(container, y){
// //     const itens = [...container.querySelectorAll('li:not(.dragging)')]

// //     return itens.reduce((maisProximo, item) => {
// //         const box = item.getBoundingClientRect()
// //         const offset = y - box.top - box.height / 2

// //         if (offset < 0 && offset > maisProximo.offset) {
// //             return { offset, element: item }
// //         } else {
// //             return maisProximo
// //         }
// //     }, { offset: Number.NEGATIVE_INFINITY }).element
// // }

// //INIT

// carregarTarefas()
// atualizarUI()



// // console.log('tarefas:', tarefas)

// // localStorage.clear()




// //Usei event delegation com addEventListener na lista, e data-attributes para identificar a ação e o item clicado.

// // 1. O que é o estado?
// // 2. O que aparece na tela?
// // 3. O que o usuário faz?
// // 4. O que muda no estado?
// // 5. O que re-renderiza?


// // CRUD (adicionar, remover, concluir)
// //persistência (localStorage)

// // 👉 UI controlada por estado
// // 👉 render condicional (ternário)
// // 👉 UX (enter, escape, foco)
// // 👉 comportamento de app real


// //O método includes() determina se um array contém um determinado elemento, retornando true ou false apropriadamente.