import { SENSACOES, dicasDa } from '../domain/sensacoes'

const ESTILO = {
  atencao: 'border-atencao bg-atencaoBg text-atencao',
  alerta: 'border-alerta bg-alertaBg text-alerta',
}

// Só aparece quando o último registro indica algo que pede cuidado.
export default function AlertaAmbiental({ ultimo }) {
  const info = ultimo ? SENSACOES[ultimo.sensacao] : null
  if (!info || info.nivel === 'ideal') return null

  const urgente = info.nivel === 'alerta'

  return (
    <div className="mx-auto max-w-6xl px-5 pb-8">
      <div role={urgente ? 'alert' : 'status'} className={`rounded-lg border-l-8 px-5 py-4 text-lg ${ESTILO[info.nivel]}`}>
        <p className="font-bold">{urgente ? 'Alerta: ' : 'Atenção: '}{info.titulo.toLowerCase()}.</p>
        <p className="mt-1">O que fazer agora: {dicasDa(ultimo.sensacao)[0]}</p>
        <p className="mt-1">
          <a href="#orientacoes" className="font-bold underline">Ver todas as orientações</a>
        </p>
      </div>
    </div>
  )
}
