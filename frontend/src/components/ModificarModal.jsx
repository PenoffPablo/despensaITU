import { useState, useEffect } from 'react';

export default function ModificarModal({ abierto, onCerrar, onModificar, ingredientes }) {
  const [seleccionadoId, setSeleccionadoId] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // El ingrediente seleccionado del dropdown
  const seleccionado = ingredientes.find((i) => i.idIngrediente === Number(seleccionadoId));

  useEffect(() => {
    if (!abierto) {
      setSeleccionadoId('');
      setNuevoStock('');
      setError('');
    }
  }, [abierto]);

  if (!abierto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!seleccionadoId) {
      setError('Selecciona un alimento de la lista.');
      return;
    }
    const stockNum = parseFloat(nuevoStock);
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El nuevo stock debe ser un número válido (mayor o igual a 0).');
      return;
    }

    setCargando(true);
    try {
      await onModificar(Number(seleccionadoId), stockNum);
      onCerrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCerrar}
      id="modal-modificar-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso-950/40 backdrop-blur-xs" />

      {/* Modal */}
      <div
        className="relative bg-white border border-amber-200 rounded-3xl p-8 w-full max-w-md animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-espresso-900 font-serif">Modificar Stock</h2>
            <p className="text-sm text-espresso-500 mt-1">Selecciona un alimento para actualizar su inventario</p>
          </div>
          <button
            onClick={onCerrar}
            className="p-2 rounded-lg hover:bg-amber-100/50 text-espresso-400 hover:text-espresso-700 transition-colors cursor-pointer"
            id="btn-cerrar-modificar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Selector de ingrediente */}
          <div>
            <label htmlFor="select-ingrediente" className="block text-sm font-bold text-espresso-700 mb-2 font-serif">
              Alimento / Ingrediente
            </label>
            <div className="relative">
              <select
                id="select-ingrediente"
                value={seleccionadoId}
                onChange={(e) => setSeleccionadoId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-espresso-900 
                           focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 
                           transition-all duration-200 cursor-pointer font-medium appearance-none"
              >
                <option value="" className="bg-white text-espresso-400">Seleccione un alimento...</option>
                {ingredientes.map((ing) => (
                  <option key={ing.idIngrediente} value={ing.idIngrediente} className="bg-white text-espresso-900">
                    {ing.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-espresso-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Stock actual */}
          {seleccionado && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-espresso-700 mb-2 font-serif">Stock actual registrado</label>
              <div className="px-4 py-3 rounded-xl bg-amber-100/50 border border-amber-200 text-amber-700 font-bold">
                {seleccionado.cantidadStockKilos.toFixed(1)} kg
              </div>
            </div>
          )}

          {/* Nuevo stock */}
          <div>
            <label htmlFor="input-nuevo-stock" className="block text-sm font-bold text-espresso-700 mb-2 font-serif">
              Nuevo Stock (kg)
            </label>
            <input
              id="input-nuevo-stock"
              type="number"
              step="0.1"
              min="0"
              value={nuevoStock}
              onChange={(e) => setNuevoStock(e.target.value)}
              placeholder="Ej: 15.3"
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
              onClick={onCerrar}
              className="flex-1 px-4 py-3 rounded-xl border border-amber-200 text-espresso-600 
                         hover:bg-amber-50 hover:text-espresso-800 transition-all duration-200 font-semibold cursor-pointer"
              id="btn-cancelar-modificar"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="flex-1 px-4 py-3 rounded-xl bg-amber-600 text-white font-semibold
                         hover:bg-amber-700 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-md shadow-amber-950/10 hover:shadow-lg cursor-pointer"
              id="btn-submit-modificar"
            >
              {cargando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Actualizando...
                </span>
              ) : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
