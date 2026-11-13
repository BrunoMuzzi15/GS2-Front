import { useEffect, useState } from 'react'
import Header from './components/Header'
import AvisoModoDemo from './components/AvisoModoDemo'
import PainelAmbiental from './components/PainelAmbiental'
import AlertaAmbiental from './components/AlertaAmbiental'
import FormRegistro from './components/FormRegistro'
import ListaRegistros from './components/ListaRegistros'
import DicasPrevencao from './components/DicasPrevencao'
import Mensagem from './components/Mensagem'
import Rodape from './components/Rodape'
import { useRegistros } from './hooks/useRegistros'
import { useAmbiente } from './hooks/useAmbiente'
import { SENSACOES } from './domain/sensacoes'
import { modoDemonstracao } from './services/registrosService'

export default function App() {
  const { registros, carregando, salvando, erro, recarregar, criar, atualizar, remover } = useRegistros()
  const { ultimo, sensacao, recentes, contagem, foraDoConforto } = useAmbiente(registros)

  const [emEdicao, setEmEdicao] = useState(null)
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    document.title = ultimo ? `${SENSACOES[ultimo.sensacao]?.rotulo} · Citizen Care` : 'Citizen Care'
  }, [ultimo])

  useEffect(() => {
    if (!aviso) return
    const timer = setTimeout(() => setAviso(null), 4000)
    return () => clearTimeout(timer)
  }, [aviso])

  async function salvar(dados) {
    try {
      if (emEdicao) {
        await atualizar(emEdicao.id, dados)
        setEmEdicao(null)
        setAviso({ tipo: 'ok', texto: 'Alterações salvas.' })
      } else {
        await criar(dados)
        setAviso({ tipo: 'ok', texto: 'Registro salvo.' })
      }
      return true
    } catch {
      setAviso({ tipo: 'erro', texto: 'Não foi possível salvar. Tente novamente.' })
      return false
    }
  }

  async function excluir(id) {
    try {
      await remover(id)
      if (emEdicao?.id === id) setEmEdicao(null)
      setAviso({ tipo: 'ok', texto: 'Registro excluído.' })
    } catch {
      setAviso({ tipo: 'erro', texto: 'Não foi possível excluir. Tente novamente.' })
    }
  }

  function editar(registro) {
    setEmEdicao(registro)
    document.getElementById('registrar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      {modoDemonstracao && <AvisoModoDemo />}

      <main id="conteudo">
        <PainelAmbiental ultimo={ultimo} sensacao={sensacao} recentes={recentes} contagem={contagem} total={registros.length} carregando={carregando} />
        <AlertaAmbiental ultimo={ultimo} />

        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-10 lg:grid-cols-[1fr_1.1fr]">
          <FormRegistro
            registroEditado={emEdicao}
            salvando={salvando}
            aoSalvar={salvar}
            aoCancelar={() => setEmEdicao(null)}
          />
          <ListaRegistros
            registros={registros}
            carregando={carregando}
            erro={erro}
            emEdicaoId={emEdicao?.id}
            foraDoConforto={foraDoConforto}
            aoEditar={editar}
            aoExcluir={excluir}
            aoRecarregar={recarregar}
          />
        </div>

        <DicasPrevencao sensacaoAtual={ultimo?.sensacao} />
      </main>

      <Rodape />
      <Mensagem aviso={aviso} />
    </>
  )
}
