import { useState } from 'react';

export default function ConfirmarBorrarModal({ abierto, ingrediente, onCerrar, onConfirmar }) {
  const [cargando, setCargando] = useState(false);

  if (!abierto || !ingrediente) return null;

  const handleConfirmar = async () => {
    setCargando(true);
    try {
      await onConfirmar(ingrediente.idIngrediente);
      onCerrar();
    } catch {
      // error handled by parent
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCerrar}
      id="modal-borrar-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso-950/40 backdrop-blur-xs" />

      {/* Modal */}
      <div
        className="relative bg-white border border-amber-200 rounded-3xl p-8 w-full max-w-sm animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-danger-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-espresso-900 font-serif mb-2">¿Quitar alimento?</h2>
          <p className="text-espresso-600 text-sm leading-relaxed">
            Estás a punto de retirar <span className="text-espresso-900 font-bold font-serif">{ingrediente.nombre}</span> de la despensa.
            <br />Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCerrar}
            className="flex-1 px-4 py-3 rounded-xl border border-amber-200 text-espresso-600 
                       hover:bg-amber-50 hover:text-espresso-800 transition-all duration-200 font-semibold cursor-pointer"
            id="btn-cancelar-borrar"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={cargando}
            className="flex-1 px-4 py-3 rounded-xl bg-danger-500 text-white font-semibold
                       hover:bg-danger-600 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md shadow-danger-500/25 hover:shadow-lg cursor-pointer"
            id="btn-confirmar-borrar"
          >
            {cargando ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Quitando...
              </span>
            ) : 'Sí, quitar'}
          </button>
        </div>
      </div>
    </div>
  );
}
