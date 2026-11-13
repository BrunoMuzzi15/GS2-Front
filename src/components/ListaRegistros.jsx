import { useMemo, useState } from 'react'
import FiltroHistorico from './FiltroHistorico'
import ItemRegistro from './ItemRegistro'

export default function ListaRegistros({ registros, carregando, erro, emEdicaoId, foraDoConforto, aoEditar, aoExcluir, aoRecarregar }) {
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return registros.filter(
      (r) => (filtro === 'todos' || r.sensacao === filtro) && (termo === '' || r.local.toLowerCase().includes(termo))
    )
  }, [registros, filtro, busca])

  return (
    <section id="historico" aria-labelledby="titulo-historico">
      <h2 id="titulo-historico" className="font-display text-3xl font-bold">Histórico</h2>

      {!carregando && !erro && registros.length > 0 && (
        <p className="mt-2 max-w-prose text-lg">
          {registros.length} {registros.length === 1 ? 'registro' : 'registros'}; {foraDoConforto}{' '}
          {foraDoConforto === 1 ? 'pediu' : 'pediram'} algum cuidado.
        </p>
      )}

      <FiltroHistorico filtro={filtro} busca={busca} aoMudarFiltro={setFiltro} aoMudarBusca={setBusca} />

      <div className="mt-4" aria-live="polite">
        {carregando && <p className="py-6 text-lg">Carregando registros…</p>}

        {erro && (
          <div className="py-6">
            <p className="text-lg font-bold text-alerta">{erro}</p>
            <button type="button" onClick={aoRecarregar} className="mt-3 rounded-md bg-brand px-4 py-2 text-lg font-bold text-white hover:bg-brandDark">
              Tentar de novo
            </button>
          </div>
        )}

        {!carregando && !erro && registros.length === 0 && (
          <p className="py-6 text-lg">Nenhum registro ainda. Preencha o formulário para começar o seu histórico.</p>
        )}

        {!carregando && !erro && registros.length > 0 && visiveis.length === 0 && (
          <p className="py-6 text-lg">Nenhum registro combina com esse filtro.</p>
        )}
      </div>

      {visiveis.length > 0 && (
        <ul className="divide-y divide-line border-y border-line">
          {visiveis.map((r) => (
            <ItemRegistro key={r.id} registro={r} emEdicao={r.id === emEdicaoId} aoEditar={aoEditar} aoExcluir={aoExcluir} />
          ))}
        </ul>
      )}
    </section>
  )
}
