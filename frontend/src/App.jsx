import { useState, useEffect, useCallback } from 'react';
import IngredienteTable from './components/IngredienteTable';
import AgregarModal from './components/AgregarModal';
import ModificarModal from './components/ModificarModal';
import ConfirmarBorrarModal from './components/ConfirmarBorrarModal';
import {
  listarIngredientes,
  agregarIngrediente,
  actualizarStock,
  borrarIngrediente,
  obtenerGerente,
} from './api/ingredientes';

export default function App() {
  const [despensaId, setDespensaId] = useState(1);
  const [ingredientes, setIngredientes] = useState([]);
  const [gerente, setGerente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const [toast, setToast] = useState(null);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalModificar, setModalModificar] = useState(false);
  const [modalBorrar, setModalBorrar] = useState(false);

  const mostrarToast = useCallback((mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const [ings, ger] = await Promise.allSettled([
        listarIngredientes(despensaId),
        obtenerGerente(despensaId),
      ]);
      if (ings.status === 'fulfilled') {
        // El backend ahora devuelve un Page de Spring, así que los datos están en 'content'
        setIngredientes(ings.value.content || ings.value || []);
      }
      if (ger.status === 'fulfilled') setGerente(ger.value);
    } catch {
      mostrarToast('Error al cargar datos de la despensa', 'error');
    } finally {
      setLoading(false);
    }
  }, [despensaId, mostrarToast]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleAgregar = async (nombre, stock) => {
    await agregarIngrediente(despensaId, nombre, stock);
    mostrarToast(`"${nombre}" guardado en la despensa`);
    await cargarDatos();
  };

  const handleModificar = async (id, nuevoStock) => {
    await actualizarStock(despensaId, id, nuevoStock);
    mostrarToast('Cantidad de stock actualizada');
    setSeleccionado(null);
    await cargarDatos();
  };

  const handleBorrar = async (id) => {
    const nombre = seleccionado?.descripcion;
    await borrarIngrediente(despensaId, id);
    mostrarToast(`"${nombre}" retirado de la despensa`);
    setSeleccionado(null);
    await cargarDatos();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <header className="farm-header sticky top-0 z-40 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md animate-pulse-warm">
              <svg className="w-6 h-6 text-espresso-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-100 font-serif tracking-wide leading-none">
                Despensa <span className="text-amber-400 italic">ITU</span>
              </h1>
              {gerente && (
                <p className="text-xs text-amber-200/80 mt-1 font-medium tracking-wider">
                  Responsable: <span className="text-amber-300 font-semibold">{gerente.nombre}</span>
                </p>
              )}
            </div>
          </div>

          {/* Selector de Despensa */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full md:w-auto">
            <label htmlFor="select-despensa" className="text-xs font-bold text-amber-200/60 uppercase tracking-widest font-serif">
              Bodega
            </label>
            <div className="relative">
              <select
                id="select-despensa"
                value={despensaId}
                onChange={(e) => {
                  setDespensaId(Number(e.target.value));
                  setSeleccionado(null);
                }}
                className="w-full sm:w-auto pl-3 pr-8 py-2 rounded-xl bg-espresso-950/70 border border-amber-500/20 text-amber-100 text-sm font-semibold
                           hover:border-amber-400/60 transition-all duration-200 cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option value={1} className="bg-espresso-900 text-amber-100 font-medium">Despensa Central (ID 1)</option>
                <option value={2} className="bg-espresso-900 text-amber-100 font-medium">Despensa Norte (ID 2)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-amber-400/80">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full md:w-auto">
            <button
              onClick={() => setModalAgregar(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage-500 text-white text-sm font-semibold
                         hover:bg-sage-600 transition-all duration-200
                         shadow-md shadow-sage-950/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="btn-agregar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nuevo Alimento
            </button>

            <button
              onClick={() => setModalModificar(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-semibold
                         hover:bg-amber-700 transition-all duration-200
                         shadow-md shadow-amber-950/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="btn-modificar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Stock
            </button>

            <button
              onClick={() => {
                if (seleccionado) {
                  setModalBorrar(true);
                } else {
                  mostrarToast('Selecciona un alimento de la lista para eliminarlo', 'error');
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-400/40 text-red-300 text-sm font-semibold
                         hover:bg-red-950/30 hover:border-red-400 transition-all duration-200
                         hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="btn-borrar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Quitar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {seleccionado && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-3 rounded-xl bg-amber-100 border border-amber-200 animate-fade-in shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-sm text-espresso-800">
              Alimento seleccionado: <span className="font-bold text-espresso-950 font-serif">{seleccionado.descripcion}</span>
              <span className="text-espresso-600"> — {seleccionado.cantidadStock.toFixed(1)} kg en despensa</span>
            </span>
            <button
              onClick={() => setSeleccionado(null)}
              className="mt-2 sm:mt-0 sm:ml-auto text-xs font-semibold text-amber-700 hover:text-amber-900 underline transition-colors cursor-pointer"
            >
              Limpiar selección
            </button>
          </div>
        )}

        <div className="farm-card p-4 sm:p-6 bg-white">
          <h2 className="text-lg sm:text-xl font-bold text-espresso-900 font-serif mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Inventario de Alimentos y Materias Primas
          </h2>
          <IngredienteTable
            ingredientes={ingredientes}
            loading={loading}
            onSeleccionar={setSeleccionado}
            seleccionado={seleccionado}
          />
        </div>
      </main>

      <footer className="border-t border-amber-200 bg-amber-100/50 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-espresso-500 font-medium">
            despensaITU — Sistema de Gestión de Alimentos y Bodega
          </p>
          <p className="text-xs text-espresso-500 italic">
            Control de Stock de Cocina e Ingredientes
          </p>
        </div>
      </footer>

      <AgregarModal
        abierto={modalAgregar}
        onCerrar={() => setModalAgregar(false)}
        onAgregar={handleAgregar}
      />

      <ModificarModal
        abierto={modalModificar}
        onCerrar={() => setModalModificar(false)}
        onModificar={handleModificar}
        ingredientes={ingredientes}
      />

      <ConfirmarBorrarModal
        abierto={modalBorrar}
        ingrediente={seleccionado}
        onCerrar={() => setModalBorrar(false)}
        onConfirmar={handleBorrar}
      />

      {toast && (
        <div className={`
          fixed bottom-6 right-6 z-50 animate-slide-up
          flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border
          ${toast.tipo === 'error'
            ? 'bg-amber-100 border-danger-400 text-danger-600 shadow-danger-500/10'
            : 'bg-sage-50 border-sage-200 text-sage-700 shadow-sage-600/10'
          }
        `}>
          {toast.tipo === 'error' ? (
            <svg className="w-5 h-5 shrink-0 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="text-sm font-semibold font-serif">{toast.mensaje}</span>
        </div>
      )}
    </div>
  );
}
