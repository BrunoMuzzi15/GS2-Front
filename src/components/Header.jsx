const LINKS = [
  ['painel', 'Painel'],
  ['registrar', 'Registrar'],
  ['historico', 'Histórico'],
  ['orientacoes', 'Orientações'],
]

function Marca() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1B5E73" />
      <path d="M16 6C16 6 9 14 9 19a7 7 0 0 0 14 0C23 14 16 6 16 6z" fill="#fff" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-20 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4">
        <a href="#painel" className="flex items-center gap-3 font-display text-2xl font-bold text-ink">
          <Marca />
          Citizen Care
        </a>
        <nav aria-label="Seções da página">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-bold">
            {LINKS.map(([id, texto]) => (
              <li key={id}>
                <a href={`#${id}`} className="py-1 text-brand underline-offset-4 hover:underline">
                  {texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
