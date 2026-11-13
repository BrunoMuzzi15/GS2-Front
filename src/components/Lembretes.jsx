import { useState } from 'react'
import { useLembretes } from '../hooks/useLembretes'

export default function Lembretes() {
  const { lembretes, adicionar, alternar, remover } = useLembretes()
  const [texto, setTexto] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    if (texto.trim().length < 3) return
    adicionar(texto)
    setTexto('')
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Lembretes de cuidado</h3>
      <p className="mt-2 max-w-prose text-lg">Marque o que já fez. A lista fica salva neste aparelho.</p>

      <ul className="mt-3 divide-y divide-line border-y border-line">
        {lembretes.map((l) => (
          <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
            <label className="flex items-center gap-3 text-lg">
              <input type="checkbox" checked={l.feito} onChange={() => alternar(l.id)} className="h-5 w-5 accent-brand" />
              <span className={l.feito ? 'line-through opacity-70' : ''}>{l.texto}</span>
            </label>
            <button type="button" onClick={() => remover(l.id)} className="font-bold text-alerta underline underline-offset-4">
              Remover<span className="sr-only"> lembrete: {l.texto}</span>
            </button>
          </li>
        ))}
        {lembretes.length === 0 && <li className="py-3 text-lg">Nenhum lembrete. Adicione o primeiro abaixo.</li>}
      </ul>

      <form onSubmit={enviar} className="mt-4">
        <label htmlFor="novo-lembrete" className="block text-base font-bold">Novo lembrete</label>
        <div className="mt-1 flex flex-wrap gap-3">
          <input
            id="novo-lembrete"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full max-w-sm rounded-md border-2 border-line bg-white px-3 py-2 text-lg"
          />
          <button type="submit" className="rounded-md bg-brand px-5 py-2 text-lg font-bold text-white hover:bg-brandDark">
            Adicionar lembrete
          </button>
        </div>
      </form>
    </div>
  )
}
