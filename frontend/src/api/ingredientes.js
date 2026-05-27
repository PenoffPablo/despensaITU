const API_BASE = 'http://localhost:8080/api';

export async function listarIngredientes() {
  const res = await fetch(`${API_BASE}/ingredientes`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al listar ingredientes');
  }
  return res.json();
}

export async function agregarIngrediente(nombre, cantidadStockKilos) {
  const res = await fetch(`${API_BASE}/ingredientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, cantidadStockKilos }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al agregar ingrediente');
  }
  return res.json();
}

export async function actualizarStock(id, cantidadStockKilos) {
  const res = await fetch(`${API_BASE}/ingredientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidadStockKilos }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al actualizar stock');
  }
  return res.json();
}

export async function borrarIngrediente(id) {
  const res = await fetch(`${API_BASE}/ingredientes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al borrar ingrediente');
  }
}

export async function obtenerGerente(idDespensa = 1) {
  const res = await fetch(`${API_BASE}/despensa/${idDespensa}/gerente`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al obtener gerente');
  }
  return res.json();
}
