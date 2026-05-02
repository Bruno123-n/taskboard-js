import { salvarTarefas } from './storage.js'
import { renderizarTarefas } from './ui.js'
import { configuracaoDragDrop } from './events.js'

export function atualizarUI() {
    salvarTarefas()
    renderizarTarefas()
    configuracaoDragDrop()
}