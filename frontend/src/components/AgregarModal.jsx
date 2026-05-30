import { useState } from 'react';

export default function AgregarModal({ abierto, onCerrar, onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  if (!abierto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const nombreNormalizado = nombre.trim().toUpperCase();

    if (!nombreNormalizado) {
      setError('El nombre del alimento es obligatorio.');
      return;
    }

    if (/^\d+$/.test(nombreNormalizado)) {
      setError('El nombre del alimento no puede consistir solo de números.');
      return;
    }

    const stockTrimmed = stock.toString().trim();
    if (!/^\d+(\.\d+)?$/.test(stockTrimmed)) {
      setError('El stock inicial debe ser un número positivo (puede contener decimales, ej: 10.5).');
      return;
    }

    const stockNum = parseFloat(stockTrimmed);
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock inicial debe ser cero o positivo.');
      return;
    }

    setCargando(true);
    try {
      await onAgregar(nombreNormalizado, stockNum);
      setNombre('');
      setStock('');
      onCerrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleCerrar = () => {
    setNombre('');
    setStock('');
    setError('');
    onCerrar();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleCerrar}
      id="modal-agregar-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso-950/40 backdrop-blur-xs" />

      {/* Modal */}
      <div
        className="relative bg-white border border-amber-200 rounded-3xl p-5 sm:p-8 w-full max-w-md animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-espresso-900 font-serif">Registrar Alimento</h2>
            <p className="text-sm text-espresso-500 mt-1">Completa los datos del nuevo lote</p>
          </div>
          <button
            onClick={handleCerrar}
            className="p-2 rounded-lg hover:bg-amber-100/50 text-espresso-400 hover:text-espresso-700 transition-colors cursor-pointer"
            id="btn-cerrar-agregar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="input-nombre" className="block text-sm font-bold text-espresso-700 mb-2 font-serif">
              Nombre del Alimento
            </label>
            <input
              id="input-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Harina de Trigo, Tomates frescos..."
              className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-espresso-900 placeholder-espresso-300 
                         focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 
                         transition-all duration-200 font-medium"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="input-stock" className="block text-sm font-bold text-espresso-700 mb-2 font-serif">
              Stock Inicial (kg)
            </label>
            <input
              id="input-stock"
              type="number"
              step="0.1"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Ej: 10.5"
              className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-espresso-900 placeholder-espresso-300 
                         focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 
                         transition-all duration-200 font-medium"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-danger-600 bg-danger-500/10 px-4 py-3 rounded-xl animate-fade-in border border-danger-400/20">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCerrar}
              className="flex-1 px-4 py-3 rounded-xl border border-amber-200 text-espresso-600 
                         hover:bg-amber-50 hover:text-espresso-800 transition-all duration-200 font-semibold cursor-pointer"
              id="btn-cancelar-agregar"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="flex-1 px-4 py-3 rounded-xl bg-sage-500 text-white font-semibold
                         hover:bg-sage-600 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-md shadow-sage-950/10 hover:shadow-lg cursor-pointer"
              id="btn-submit-agregar"
            >
              {cargando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
