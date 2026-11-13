const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const CHAVE_LOCAL = 'citizen-care:registros'

export const modoDemonstracao = !API_URL

const numeroOuNulo = (v) => (v === null || v === undefined || v === '' ? null : Number(v))

function normalizar(registro) {
  return {
    ...registro,
    temperatura: numeroOuNulo(registro.temperatura),
    umidade: numeroOuNulo(registro.umidade),
    cuidado: registro.cuidado || 'Nenhum',
    observacao: registro.observacao ?? '',
  }
}

async function pedir(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  })
  if (!resposta.ok) throw new Error(`A API respondeu com status ${resposta.status}`)
  return resposta.json()
}

const remoto = {
  listar: async () => (await pedir('/registros')).map(normalizar),
  criar: async (dados) => normalizar(await pedir('/registros', { method: 'POST', body: JSON.stringify(dados) })),
  atualizar: async (id, dados) =>
    normalizar(await pedir(`/registros/${id}`, { method: 'PUT', body: JSON.stringify(dados) })),
  remover: async (id) => {
    await pedir(`/registros/${id}`, { method: 'DELETE' })
  },
}


const esperar = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function dadosIniciais() {
  const horas = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString()
  return [
    { id: 'demo-1', local: 'Sala de estudos', sensacao: 'confortavel', temperatura: 24, umidade: 52, cuidado: 'Abri janelas', observacao: 'Manhã tranquila.', criadoEm: horas(30) },
    { id: 'demo-2', local: 'Quarto', sensacao: 'abafado', temperatura: null, umidade: 74, cuidado: 'Abri janelas', observacao: 'Cheiro de mofo no armário.', criadoEm: horas(20) },
    { id: 'demo-3', local: 'Sala de aula', sensacao: 'calor', temperatura: 30, umidade: null, cuidado: 'Bebi água', observacao: 'Sem ventilação na última aula.', criadoEm: horas(8) },
    { id: 'demo-4', local: 'Sala de estudos', sensacao: 'seco', temperatura: null, umidade: 28, cuidado: 'Nenhum', observacao: '', criadoEm: horas(2) },
  ]
}

function lerLocal() {
  try {
    const texto = localStorage.getItem(CHAVE_LOCAL)
    if (texto) return JSON.parse(texto)
  } catch {
    
  }
  const iniciais = dadosIniciais()
  gravarLocal(iniciais)
  return iniciais
}

function gravarLocal(lista) {
  try {
    localStorage.setItem(CHAVE_LOCAL, JSON.stringify(lista))
  } catch {

  }
}

const local = {
  async listar() {
    await esperar()
    return lerLocal().map(normalizar)
  },
  async criar(dados) {
    await esperar()
    const novo = normalizar({ ...dados, id: `local-${Date.now()}` })
    gravarLocal([novo, ...lerLocal()])
    return novo
  },
  async atualizar(id, dados) {
    await esperar()
    const lista = lerLocal()
    const indice = lista.findIndex((r) => r.id === id)
    if (indice === -1) throw new Error('Registro não encontrado')
    lista[indice] = normalizar({ ...lista[indice], ...dados, id })
    gravarLocal(lista)
    return lista[indice]
  },
  async remover(id) {
    await esperar()
    gravarLocal(lerLocal().filter((r) => r.id !== id))
  },
}

const origem = modoDemonstracao ? local : remoto

export const listarRegistros = () => origem.listar()
export const criarRegistro = (dados) => origem.criar(dados)
export const atualizarRegistro = (id, dados) => origem.atualizar(id, dados)
export const removerRegistro = (id) => origem.remover(id)
