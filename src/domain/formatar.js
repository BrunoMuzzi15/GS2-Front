const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatarNumero(valor) {
  return Number(valor).toLocaleString('pt-BR', { maximumFractionDigits: 1 })
}

export function formatarData(iso) {
  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return 'data desconhecida'
  return formatadorData.format(data)
}

export function medidasEmTexto(registro) {
  const partes = []
  if (registro.temperatura !== null && registro.temperatura !== undefined) partes.push(`${formatarNumero(registro.temperatura)} °C`)
  if (registro.umidade !== null && registro.umidade !== undefined) partes.push(`${formatarNumero(registro.umidade)}% de umidade`)
  return partes.join(' e ')
}
