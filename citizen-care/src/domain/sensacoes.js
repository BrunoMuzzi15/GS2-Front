// Regras do núcleo digital: a pessoa registra como sentiu o ambiente
// e a plataforma devolve orientações simples de prevenção.
// (A medição automática com sensor é feita por outro módulo do projeto.)

export const SENSACOES = {
  confortavel: { rotulo: 'Confortável', nivel: 'ideal', titulo: 'O ambiente está confortável' },
  calor: { rotulo: 'Com calor', nivel: 'atencao', titulo: 'O ambiente está quente' },
  calor_forte: { rotulo: 'Calor forte', nivel: 'alerta', titulo: 'O ambiente está com calor forte' },
  frio: { rotulo: 'Com frio', nivel: 'atencao', titulo: 'O ambiente está frio' },
  seco: { rotulo: 'Ar seco', nivel: 'atencao', titulo: 'O ar do ambiente está seco' },
  abafado: { rotulo: 'Ar abafado', nivel: 'atencao', titulo: 'O ar do ambiente está abafado' },
}

export const CUIDADOS = [
  'Nenhum',
  'Bebi água',
  'Abri janelas',
  'Usei ventilador',
  'Troquei de roupa',
  'Fui para um lugar mais fresco',
]

const DICAS = {
  confortavel: ['Nada a fazer agora. Continue registrando para perceber quando algo muda.'],
  calor: [
    'Beba água aos poucos, mesmo sem sentir sede.',
    'Abra janelas ou use ventilador para o ar circular.',
    'Prefira roupas leves e evite esforço nas horas mais quentes.',
  ],
  calor_forte: [
    'Vá para um lugar com sombra e ventilação o quanto antes.',
    'Beba água e descanse; evite qualquer esforço físico.',
    'Fique de olho em idosos e crianças. Se alguém passar mal, procure atendimento de saúde.',
  ],
  frio: [
    'Vista roupas em camadas e mantenha o corpo aquecido.',
    'Deixe uma fresta de janela aberta para o ar se renovar.',
    'Bebidas mornas ajudam a manter o conforto.',
  ],
  seco: [
    'Passe pano úmido no chão em vez de varrer a seco.',
    'Deixe uma bacia de água ou toalha úmida no ambiente.',
    'Beba água com frequência; o ar seco resseca a pele e o nariz.',
  ],
  abafado: [
    'Abra portas e janelas para o ar circular, principalmente depois do banho.',
    'Seque roupas e superfícies molhadas; a umidade favorece o mofo.',
    'Mantenha armários e cantos de parede ventilados.',
  ],
}

export const dicasDa = (sensacao) => DICAS[sensacao] ?? DICAS.confortavel
