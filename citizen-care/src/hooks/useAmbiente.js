import { useMemo } from 'react'
import { SENSACOES } from '../domain/sensacoes'

// Resume a lista de registros para o painel.
export function useAmbiente(registros) {
  return useMemo(() => {
    const ultimo = registros[0] ?? null
    const sensacao = ultimo ? SENSACOES[ultimo.sensacao] : null
    const recentes = registros.slice(0, 7)

    const contagem = {}
    Object.keys(SENSACOES).forEach((id) => {
      contagem[id] = 0
    })
    registros.forEach((r) => {
      if (r.sensacao in contagem) contagem[r.sensacao] += 1
    })
    const foraDoConforto = registros.filter((r) => SENSACOES[r.sensacao]?.nivel !== 'ideal').length

    return { ultimo, sensacao, recentes, contagem, foraDoConforto }
  }, [registros])
}
