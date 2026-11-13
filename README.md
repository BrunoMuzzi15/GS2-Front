# Citizen Care

## Ficha da CitizenTech

Campo | Resposta 

Nome da CitizenTech | Citizen Care 
Cidade e bairro | preencher: cidade e bairro da equipe
Cidadão beneficiado | Moradores, estudantes, trabalhadores e pessoas com mais dificuldade de acessar informação preventiva 
Problema, em uma frase | Mudanças de temperatura e umidade passam despercebidas em casa, na escola e no trabalho, e falta orientação clara sobre o que fazer 
Como funciona | O cidadão registra como sente o ambiente (e o cuidado que tomou); o painel mostra a situação mais recente e a evolução, e a plataforma devolve orientações e lembretes de prevenção 
O que cada parte faz | Front-end e Web Development: aplicação web (interface, registros, histórico, orientações, lembretes e API).
| Link do repositório | https://github.com/BrunoMuzzi15/GS2-Web.git 
Indicador de impacto | Percentual de registros fora da faixa confortável que receberam uma orientação / ação do usuário (a validar nos testes) 
ODS conectados | ODS 3, Saúde e Bem-estar 

**Integrantes:** Arthur Kazuo — RM 572043
                 Bruno Muzzi — RM 573232
                 Daniel Lopes — RM 573415
                 João Mello — RM 573001 
                 Thiago Lutfi — RM 573531

## O que é

Aplicação web do Citizen Care: painel do ambiente, registros (CRUD) do dia a dia, histórico com filtros, orientações de prevenção e lembretes de cuidado.

## Tecnologias

- React 18 com Vite
- Tailwind CSS 3
- Fetch API para consumir a API externa (MockAPI.io)

## Como a aplicação está organizada

src/
  components/   interface (somente apresentação)
  hooks/        useRegistros, useAmbiente, useFormRegistro, useLembretes
  services/     acesso à API (registrosService.js)
  domain/       situações do ambiente, orientações e formatação
  App.jsx       junta tudo


Separação de responsabilidades:

- **Visual**: `components/` recebe dados e funções por props.
- **Lógica de negócio**: `domain/sensacoes.js` (situações e orientações) e os hooks.
- **Acesso a dados**: apenas `services/registrosService.js` conhece a API.

## Requisitos da atividade

Requisito | Onde está 
React com Vite | `vite.config.js`, `src/main.jsx` 
Tailwind CSS | `tailwind.config.js`, `src/index.css` 
8+ componentes | 14 em `src/components/` 
`useState` e `useEffect` | `App.jsx`, `useRegistros`, `useFormRegistro`, `useLembretes`, `DicasPrevencao` 
2+ custom hooks | `useRegistros`, `useAmbiente`, `useFormRegistro`, `useLembretes` 
API externa com CRUD | `services/registrosService.js` (GET, POST, PUT, DELETE) 
Funcionalidades do tema | painel do ambiente, alertas acessíveis, histórico e registros, filtros, orientações de prevenção e lembretes 
Git com 15+ commits | histórico do repositório 
AI.md | raiz do projeto 

## O que a aplicação faz

- **Painel do ambiente:** situação do último registro e evolução recente.
- **Alertas acessíveis:** aviso claro, com o que fazer agora, quando a situação pede cuidado.
- **Histórico e registros (CRUD):** criar, consultar, editar e excluir registros, com filtro por situação e busca por local.
- **Prevenção e orientação:** conteúdos simples por situação (calor, frio, ar seco, ar abafado) e lembretes de cuidado.

## Como rodar

Pré-requisito: Node.js 18 ou superior.
npm install
npm run dev

Sem configurar nada, o app abre em **modo demonstração**: os registros ficam no `localStorage` do navegador, com quatro exemplos simulados.
Configurado a API, os registros ficam no network - fetch do navegador configurados como registros
## Configurar a API externa (MockAPI.io)

1. Crie uma conta em https://mockapi.io e um novo projeto.
2. Crie o recurso `registros` com os campos: `local` (string), `sensacao` (string), `cuidado` (string), `temperatura` (number), `umidade` (number), `observacao` (string), `criadoEm` (string).
3. Copie a URL base do projeto, por exemplo `https://6af69156e844c7ff741b7530.mockapi.io/api/v1/registros`.
4. Copie `.env.example` para `.env` e preencha:
   ```
   VITE_API_URL=https://xxxxxxxx.mockapi.io/api/v1
   ```
5. Rode de novo `npm run dev`. O aviso de modo demonstração some.

## Deploy (Vercel)

1. Suba o projeto no GitHub e importe o repositório na Vercel (preset Vite).
2. Em *Settings > Environment Variables*, adicione `VITE_API_URL` com a URL da MockAPI.
3. Faça o deploy e coloque o link na entrega.

## Acessibilidade e privacidade

- Fonte Atkinson Hyperlegible, texto grande e contraste alto.
- Situação do ambiente indicada por palavra, forma e cor (nunca só pela cor).
- Formulário com rótulos, mensagens de erro ligadas aos campos e foco visível.
- Navegação por teclado, link "Ir para o conteúdo" e mensagens anunciadas a leitores de tela.
- Nenhum dado pessoal é coletado; os dados de teste são simulados.
- O sistema alerta sobre o ambiente e não faz diagnóstico médico.
