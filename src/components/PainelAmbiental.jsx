import SeloNivel from './SeloNivel'
import ResumoRegistros from './ResumoRegistros'
import { formatarData, medidasEmTexto } from '../domain/formatar'

export default function PainelAmbiental({ ultimo, sensacao, recentes, contagem, total, carregando }) {
  const medidas = ultimo ? medidasEmTexto(ultimo) : ''

  return (
    <section id="painel" aria-labelledby="titulo-painel" className="mx-auto max-w-6xl px-5 pb-10 pt-10">
      <h1 id="titulo-painel" className="sr-only">Painel do ambiente</h1>

      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {carregando && <p className="text-xl">Carregando o painel…</p>}

          {!carregando && !ultimo && (
            <div>
              <p className="font-display text-4xl font-bold leading-tight">Ainda não há registros.</p>
              <p className="mt-4 max-w-prose text-lg">
                Conte como você sente o ambiente na seção{' '}
                <a href="#registrar" className="font-bold text-brand underline">Registrar</a>. O painel passa a
                mostrar a situação mais recente e a evolução ao longo dos dias.
              </p>
            </div>
          )}

          {ultimo && sensacao && (
            <div>
              <SeloNivel sensacao={ultimo.sensacao} />
              <p className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{sensacao.titulo}</p>
              <p className="mt-4 max-w-prose text-lg">
                Último registro em <strong>{ultimo.local}</strong>, {formatarData(ultimo.criadoEm)}.
                {medidas && <> Medidas anotadas: {medidas}.</>}
              </p>
              {ultimo.cuidado !== 'Nenhum' && (
                <p className="mt-2 max-w-prose text-lg">Cuidado tomado: {ultimo.cuidado.toLowerCase()}.</p>
              )}
            </div>
          )}
        </div>

        <ResumoRegistros recentes={recentes} contagem={contagem} total={total} />
      </div>
    </section>
  )
}
