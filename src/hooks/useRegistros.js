import { useCallback, useEffect, useState } from 'react'
import {
  listarRegistros,
  criarRegistro,
  atualizarRegistro,
  removerRegistro,
} from '../services/registrosService'


const maisRecentesPrimeiro = (lista) =>
  [...lista].sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))


export function useRegistros() {
  const [registros, setRegistros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      setRegistros(maisRecentesPrimeiro(await listarRegistros()))
    } catch {
      setErro('Não foi possível carregar os registros. Confira a conexão e tente de novo.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  
  async function comSalvando(operacao) {
    setSalvando(true)
    try {
      return await operacao()
    } finally {
      setSalvando(false)
    }
  }

  const criar = (dados) =>
    comSalvando(async () => {
      const novo = await criarRegistro({ ...dados, criadoEm: new Date().toISOString() })
      setRegistros((lista) => maisRecentesPrimeiro([novo, ...lista]))
    })

  const atualizar = (id, dados) =>
    comSalvando(async () => {
      const original = registros.find((r) => r.id === id)
      const atualizado = await atualizarRegistro(id, { ...original, ...dados })
      setRegistros((lista) => maisRecentesPrimeiro(lista.map((r) => (r.id === id ? atualizado : r))))
    })

  const remover = (id) =>
    comSalvando(async () => {
      await removerRegistro(id)
      setRegistros((lista) => lista.filter((r) => r.id !== id))
    })

  return { registros, carregando, salvando, erro, recarregar: carregar, criar, atualizar, remover }
}
