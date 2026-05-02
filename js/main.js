//main
import { carregarFiltro, carregarTarefas } from './storage.js'
import { configurarEventos } from './events.js'
import { atualizarUI } from './uiController.js'
import { carregarTema } from './actions.js'


//INIT
carregarTarefas()
carregarFiltro()
configurarEventos()
atualizarUI()
