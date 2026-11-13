import { SENSACOES } from '../domain/sensacoes'
import { formatarData } from '../domain/formatar'

export default function ResumoRegistros({ recentes, contagem, total }) {
  if (total === 0) return null

  const presentes = Object.entries(contagem).filter(([, n]) => n > 0)

  return (
    <div className="rounded-lg border border-line bg-paper p-5">
      <h2 className="font-display text-2xl font-bold">Evolução recente</h2>
      <ol className="mt-3 divide-y divide-line">
        {recentes.map((r) => (
          <li key={r.id} className="flex items-baseline justify-between gap-4 py-2 text-lg">
            <span>{r.local}</span>
            <span className="text-right">
              <strong>{SENSACOES[r.sensacao]?.rotulo}</strong>
              <span className="block text-base text-ink/80">{formatarData(r.criadoEm)}</span>
            </span>
          </li>
        ))}
      </ol>

      <h3 className="mt-5 text-lg font-bold">Quantas vezes cada situação apareceu</h3>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-lg">
        {presentes.map(([id, n]) => (
          <li key={id}>
            {SENSACOES[id].rotulo}: <strong>{n}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
