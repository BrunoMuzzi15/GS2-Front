import { SENSACOES } from '../domain/sensacoes'

const ESTILO = {
  ideal: 'bg-okBg text-ok',
  atencao: 'bg-atencaoBg text-atencao',
  alerta: 'bg-alertaBg text-alerta',
}

// Cada nível tem forma e palavra próprias, para não depender só da cor.
function Icone({ nivel }) {
  if (nivel === 'ideal') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4.5 8.3l2.4 2.4 4.6-4.9" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  if (nivel === 'atencao') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1.5L15 14H1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 1h6l4 4v6l-4 4H5l-4-4V5z" fill="currentColor" />
      <path d="M8 4.5v4.5M8 10.8v.7" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

export default function SeloNivel({ sensacao }) {
  const info = SENSACOES[sensacao]
  if (!info) return null
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-base font-bold ${ESTILO[info.nivel]}`}>
      <Icone nivel={info.nivel} />
      {info.rotulo}
    </span>
  )
}
