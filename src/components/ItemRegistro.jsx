import { useState } from 'react'
import SeloNivel from './SeloNivel'
import { formatarData, medidasEmTexto } from '../domain/formatar'

export default function ItemRegistro({ registro, emEdicao, aoEditar, aoExcluir }) {
  const [confirmando, setConfirmando] = useState(false)
  const medidas = medidasEmTexto(registro)

  return (
    <li className={`py-5 ${emEdicao ? 'bg-paper' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-lg font-bold">{registro.local}</p>
          <p className="text-base text-ink/80">{formatarData(registro.criadoEm)}</p>
        </div>
        <SeloNivel sensacao={registro.sensacao} />
      </div>

      {registro.cuidado !== 'Nenhum' && <p className="mt-2 text-lg">Cuidado: {registro.cuidado.toLowerCase()}.</p>}
      {medidas && <p className="mt-1 text-base">Medidas anotadas: {medidas}.</p>}
      {registro.observacao && <p className="mt-1 max-w-prose text-base text-ink/80">{registro.observacao}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!confirmando ? (
          <>
            <button type="button" onClick={() => aoEditar(registro)} className="font-bold text-brand underline underline-offset-4">
              Editar<span className="sr-only"> registro de {registro.local}</span>
            </button>
            <button type="button" onClick={() => setConfirmando(true)} className="font-bold text-alerta underline underline-offset-4">
              Excluir<span className="sr-only"> registro de {registro.local}</span>
            </button>
          </>
        ) : (
          <>
            <span className="text-base font-bold">Excluir este registro?</span>
            <button type="button" onClick={() => aoExcluir(registro.id)} className="rounded-md bg-alerta px-3 py-1 text-base font-bold text-white">
              Sim, excluir
            </button>
            <button type="button" onClick={() => setConfirmando(false)} className="rounded-md border-2 border-line px-3 py-1 text-base font-bold">
              Manter
            </button>
          </>
        )}
      </div>
    </li>
  )
}
