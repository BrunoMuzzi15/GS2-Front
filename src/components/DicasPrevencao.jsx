import { useEffect, useState } from 'react'
import Lembretes from './Lembretes'
import { SENSACOES, dicasDa } from '../domain/sensacoes'

export default function DicasPrevencao({ sensacaoAtual }) {
  const [escolhida, setEscolhida] = useState(sensacaoAtual ?? 'calor')

  useEffect(() => {
    if (sensacaoAtual) setEscolhida(sensacaoAtual)
  }, [sensacaoAtual])

  return (
    <section id="orientacoes" aria-labelledby="titulo-orientacoes" className="mx-auto max-w-6xl px-5 py-12">
      <h2 id="titulo-orientacoes" className="font-display text-3xl font-bold">Orientações</h2>
      <p className="mt-2 max-w-prose text-lg">
        Escolha a situação para ver cuidados simples. Elas servem para prevenir e não substituem orientação médica.
      </p>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <div>
          <div role="group" aria-label="Situação do ambiente" className="flex flex-wrap gap-2">
            {Object.entries(SENSACOES).map(([id, s]) => (
              <button
                key={id}
                type="button"
                aria-pressed={escolhida === id}
                onClick={() => setEscolhida(id)}
                className={`rounded-full border-2 px-4 py-1.5 text-base font-bold ${
                  escolhida === id ? 'border-brand bg-brand text-white' : 'border-line bg-white hover:border-brand'
                }`}
              >
                {s.rotulo}
              </button>
            ))}
          </div>

          <h3 className="mt-6 text-xl font-bold">{SENSACOES[escolhida].titulo}</h3>
          <ul className="mt-3 space-y-3" aria-live="polite">
            {dicasDa(escolhida).map((dica) => (
              <li key={dica} className="border-l-4 border-brand pl-4 text-lg">{dica}</li>
            ))}
          </ul>
        </div>

        <Lembretes />
      </div>
    </section>
  )
}
