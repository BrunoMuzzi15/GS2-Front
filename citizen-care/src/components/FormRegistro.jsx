import { useEffect, useRef } from 'react'
import { useFormRegistro } from '../hooks/useFormRegistro'
import { CUIDADOS, SENSACOES } from '../domain/sensacoes'

function Campo({ id, rotulo, ajuda, erro, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold">{rotulo}</label>
      {ajuda && <p id={`${id}-ajuda`} className="text-base text-ink/80">{ajuda}</p>}
      {children}
      {erro && <p id={`${id}-erro`} className="mt-1 text-base font-bold text-alerta">{erro}</p>}
    </div>
  )
}

const ENTRADA = 'mt-1 w-full rounded-md border-2 border-line bg-white px-3 py-2 text-lg aria-[invalid=true]:border-alerta'

export default function FormRegistro({ registroEditado, salvando, aoSalvar, aoCancelar }) {
  const { valores, erros, alterar, enviar } = useFormRegistro({ registroEditado, aoSalvar })
  const campoLocal = useRef(null)
  const editando = Boolean(registroEditado)

  // ao começar uma edição, leva o foco para o primeiro campo
  useEffect(() => {
    if (editando) campoLocal.current?.focus()
  }, [editando])

  const props = (campo) => ({
    id: campo,
    value: valores[campo],
    onChange: alterar(campo),
    'aria-invalid': erros[campo] ? 'true' : 'false',
    'aria-describedby': [erros[campo] && `${campo}-erro`, `${campo}-ajuda`].filter(Boolean).join(' ') || undefined,
    className: ENTRADA,
  })

  return (
    <section id="registrar" aria-labelledby="titulo-registrar">
      <h2 id="titulo-registrar" className="font-display text-3xl font-bold">
        {editando ? 'Editar registro' : 'Novo registro'}
      </h2>
      <p className="mt-2 max-w-prose text-lg">
        Conte como está o ambiente onde você está. Temperatura e umidade são opcionais: preencha só se tiver essas
        medidas.
      </p>

      <form onSubmit={enviar} noValidate className="mt-6 space-y-5">
        <Campo id="local" rotulo="Onde você está" ajuda="Por exemplo: sala, quarto, sala de aula." erro={erros.local}>
          <input type="text" ref={campoLocal} autoComplete="off" {...props('local')} />
        </Campo>

        <Campo id="sensacao" rotulo="Como está o ambiente" erro={erros.sensacao}>
          <select {...props('sensacao')}>
            <option value="">Escolha uma opção</option>
            {Object.entries(SENSACOES).map(([id, s]) => (
              <option key={id} value={id}>{s.rotulo}</option>
            ))}
          </select>
        </Campo>

        <Campo id="cuidado" rotulo="Cuidado que você tomou" ajuda="Escolha o que mais se aproxima.">
          <select {...props('cuidado')}>
            {CUIDADOS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Campo>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo id="temperatura" rotulo="Temperatura em °C (opcional)" ajuda="Use vírgula para decimais." erro={erros.temperatura}>
            <input type="text" inputMode="decimal" autoComplete="off" {...props('temperatura')} />
          </Campo>
          <Campo id="umidade" rotulo="Umidade em % (opcional)" ajuda="De 0 a 100." erro={erros.umidade}>
            <input type="text" inputMode="decimal" autoComplete="off" {...props('umidade')} />
          </Campo>
        </div>

        <Campo id="observacao" rotulo="Observação (opcional)" ajuda="Algo que ajude a lembrar do momento." erro={erros.observacao}>
          <textarea rows="3" {...props('observacao')} />
        </Campo>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-md bg-brand px-5 py-2.5 text-lg font-bold text-white hover:bg-brandDark disabled:opacity-60"
          >
            {salvando ? 'Salvando…' : editando ? 'Salvar alterações' : 'Salvar registro'}
          </button>
          {editando && (
            <button
              type="button"
              onClick={aoCancelar}
              className="rounded-md border-2 border-brand px-5 py-2.5 text-lg font-bold text-brand hover:bg-white"
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
