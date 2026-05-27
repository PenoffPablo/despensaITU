import { useState } from 'react';

export default function IngredienteTable({ ingredientes, loading, onSeleccionar, seleccionado }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (loading) {
    return (
      <div className="border border-amber-200 rounded-2xl p-8 bg-white">
        <div className="flex items-center justify-center gap-3 text-sage-600">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-semibold font-serif">Revisando despensa...</span>
        </div>
      </div>
    );
  }

  if (ingredientes.length === 0) {
    return (
      <div className="border border-amber-200 rounded-2xl p-12 text-center bg-white">
        <div className="text-5xl mb-4">🌾</div>
        <p className="text-espresso-800 text-lg font-bold font-serif">La despensa está vacía</p>
        <p className="text-espresso-500 text-sm mt-1">Registra tu primer alimento o materia prima</p>
      </div>
    );
  }

  return (
    <div className="border border-amber-200 rounded-2xl overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full" id="tabla-ingredientes">
          <thead>
            <tr className="border-b border-amber-200 bg-amber-50">
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-espresso-700 font-serif">
                Alimento / Ingrediente
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-espresso-700 font-serif">
                Cantidad disponible (Stock)
              </th>
              <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-espresso-700 font-serif">
                Código
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ing, index) => {
              const isSelected = seleccionado?.idIngrediente === ing.idIngrediente;
              const isHovered = hoveredRow === index;

              return (
                <tr
                  key={ing.idIngrediente}
                  onClick={() => onSeleccionar(isSelected ? null : ing)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`
                    cursor-pointer transition-all duration-150 border-b border-amber-100 last:border-b-0
                    ${isSelected
                      ? 'bg-amber-100/50 border-l-2 border-l-amber-600'
                      : isHovered
                        ? 'bg-amber-50/40'
                        : ''
                    }
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Estado visual orgánico del stock */}
                      <div className={`
                        w-3 h-3 rounded-full transition-all duration-300
                        ${ing.cantidadStockKilos > 20
                          ? 'bg-success-500 shadow-sm' // Alto stock (verde)
                          : ing.cantidadStockKilos > 5
                            ? 'bg-amber-500 shadow-sm' // Stock medio (naranja/amarillo)
                            : 'bg-danger-500 shadow-sm animate-pulse' // Stock crítico (rojo ladrillo)
                        }
                      `} />
                      <span className="font-semibold text-espresso-900 font-serif">{ing.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                      ${ing.cantidadStockKilos > 20
                        ? 'bg-success-500/10 text-success-500'
                        : ing.cantidadStockKilos > 5
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-danger-500/10 text-danger-500'
                      }
                    `}>
                      {ing.cantidadStockKilos.toFixed(1)} kg
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-espresso-400 text-sm font-mono font-medium">#{ing.idIngrediente}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer con total */}
      <div className="border-t border-amber-200 px-6 py-4 flex justify-between items-center bg-amber-50">
        <span className="text-xs font-semibold text-espresso-600">
          {ingredientes.length} alimento{ingredientes.length !== 1 ? 's' : ''} registrado{ingredientes.length !== 1 ? 's' : ''}
        </span>
        <span className="text-sm font-bold font-serif text-espresso-800">
          Carga total en despensa: <span className="text-amber-700">{ingredientes.reduce((sum, i) => sum + i.cantidadStockKilos, 0).toFixed(1)} kg</span>
        </span>
      </div>
    </div>
  );
}
