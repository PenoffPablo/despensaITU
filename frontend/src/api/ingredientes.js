const API_BASE = '/api';

export async function listarIngredientes(despensaId = 1) {
  const res = await fetch(`${API_BASE}/ingredientes?despensaId=${despensaId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al listar ingredientes');
  }
  return res.json();
}

export async function agregarIngrediente(despensaId, descripcion, cantidadStock) {
  const res = await fetch(`${API_BASE}/ingredientes?despensaId=${despensaId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion, cantidadStock }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al agregar ingrediente');
  }
  return res.json();
}

export async function actualizarStock(despensaId, id, cantidadStock) {
  const res = await fetch(`${API_BASE}/ingredientes/${id}?despensaId=${despensaId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidadStock }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al actualizar stock');
  }
  return res.json();
}

export async function borrarIngrediente(despensaId, id) {
  const res = await fetch(`${API_BASE}/ingredientes/${id}?despensaId=${despensaId}`, {
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
