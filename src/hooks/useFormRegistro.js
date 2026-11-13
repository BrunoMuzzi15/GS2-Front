import { useEffect, useState } from 'react'
import { SENSACOES } from '../domain/sensacoes'

const VAZIO = { local: '', sensacao: '', cuidado: 'Nenhum', temperatura: '', umidade: '', observacao: '' }

const comVirgula = (n) => (n === null || n === undefined ? '' : String(n).replace('.', ','))

function lerNumero(texto) {
  const limpo = String(texto).trim().replace(',', '.')
  if (limpo === '') return null // campo opcional
  return Number(limpo)
}

function validar(valores) {
  const erros = {}
  const dados = {}

  const local = valores.local.trim()
  if (local.length < 2) erros.local = 'Diga onde você está, por exemplo "Sala" ou "Quarto".'
  else if (local.length > 60) erros.local = 'Use no máximo 60 letras.'
  dados.local = local

  if (!(valores.sensacao in SENSACOES)) erros.sensacao = 'Escolha como você sente o ambiente.'
  dados.sensacao = valores.sensacao
  dados.cuidado = valores.cuidado

  const temperatura = lerNumero(valores.temperatura)
  if (Number.isNaN(temperatura)) erros.temperatura = 'Use só números, por exemplo 27,5.'
  else if (temperatura !== null && (temperatura < -10 || temperatura > 60)) erros.temperatura = 'Informe uma temperatura entre -10 e 60 °C.'
  dados.temperatura = temperatura

  const umidade = lerNumero(valores.umidade)
  if (Number.isNaN(umidade)) erros.umidade = 'Use só números, por exemplo 55.'
  else if (umidade !== null && (umidade < 0 || umidade > 100)) erros.umidade = 'A umidade fica entre 0 e 100%.'
  dados.umidade = umidade

  const observacao = valores.observacao.trim()
  if (observacao.length > 200) erros.observacao = 'Escreva no máximo 200 letras.'
  dados.observacao = observacao

  return { erros, dados }
}

// Estado e validação do formulário. Serve para cadastrar e para editar.
export function useFormRegistro({ registroEditado, aoSalvar }) {
  const [valores, setValores] = useState(VAZIO)
  const [erros, setErros] = useState({})

  // quando muda o registro em edição, o formulário se reajusta
  useEffect(() => {
    setErros({})
    setValores(
      registroEditado
        ? {
            local: registroEditado.local,
            sensacao: registroEditado.sensacao,
            cuidado: registroEditado.cuidado,
            temperatura: comVirgula(registroEditado.temperatura),
            umidade: comVirgula(registroEditado.umidade),
            observacao: registroEditado.observacao ?? '',
          }
        : VAZIO
    )
  }, [registroEditado])

  const alterar = (campo) => (evento) => {
    setValores((v) => ({ ...v, [campo]: evento.target.value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const resultado = validar(valores)
    setErros(resultado.erros)
    if (Object.keys(resultado.erros).length > 0) return

    const salvou = await aoSalvar(resultado.dados)
    if (salvou && !registroEditado) setValores(VAZIO)
  }

  return { valores, erros, alterar, enviar }
}
