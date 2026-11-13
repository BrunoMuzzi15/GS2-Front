export default function Mensagem({ aviso }) {
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-4 bottom-4 z-10 sm:right-auto sm:max-w-md">
      {aviso && (
        <p
          className={`rounded-md px-4 py-3 text-lg font-bold shadow-lg ${
            aviso.tipo === 'erro' ? 'bg-alerta text-white' : 'bg-ink text-white'
          }`}
        >
          {aviso.texto}
        </p>
      )}
    </div>
  )
}
