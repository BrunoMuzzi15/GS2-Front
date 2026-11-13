import { SENSACOES } from '../domain/sensacoes'

const OPCOES = [['todos', 'Todos'], ...Object.entries(SENSACOES).map(([id, s]) => [id, s.rotulo])]

export default function FiltroHistorico({ filtro, busca, aoMudarFiltro, aoMudarBusca }) {
  return (
    <div className="mt-5 space-y-4">
      <div>
        <label htmlFor="busca" className="block text-base font-bold">Buscar por local</label>
        <input
          id="busca"
          type="search"
          value={busca}
          onChange={(e) => aoMudarBusca(e.target.value)}
          className="mt-1 w-full max-w-sm rounded-md border-2 border-line bg-white px-3 py-2 text-lg"
        />
      </div>

      <div role="group" aria-label="Filtrar pela situação do ambiente" className="flex flex-wrap gap-2">
        {OPCOES.map(([valor, texto]) => (
          <button
            key={valor}
            type="button"
            aria-pressed={filtro === valor}
            onClick={() => aoMudarFiltro(valor)}
            className={`rounded-full border-2 px-4 py-1.5 text-base font-bold ${
              filtro === valor ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand'
            }`}
          >
            {texto}
          </button>
        ))}
      </div>
    </div>
  )
}
