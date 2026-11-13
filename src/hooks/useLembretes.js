import { useEffect, useState } from 'react'

const CHAVE = 'citizen-care:lembretes'

const INICIAIS = [
  { id: 'l1', texto: 'Beber água ao longo do dia', feito: false },
  { id: 'l2', texto: 'Abrir as janelas para ventilar o ambiente', feito: false },
  { id: 'l3', texto: 'Ver como estão idosos e crianças em dias de calor', feito: false },
]

function ler() {
  try {
    const texto = localStorage.getItem(CHAVE)
    if (texto) return JSON.parse(texto)
  } catch {
  
  }
  return INICIAIS
}


export function useLembretes() {
  const [lembretes, setLembretes] = useState(ler)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lembretes))
    } catch {
      
    }
  }, [lembretes])

  const adicionar = (texto) =>
    setLembretes((lista) => [...lista, { id: `l${Date.now()}`, texto: texto.trim(), feito: false }])

  const alternar = (id) =>
    setLembretes((lista) => lista.map((l) => (l.id === id ? { ...l, feito: !l.feito } : l)))

  const remover = (id) => setLembretes((lista) => lista.filter((l) => l.id !== id))

  return { lembretes, adicionar, alternar, remover }
}
