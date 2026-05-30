import apiClient from './apiClient';

export async function listarIngredientes(despensaId = 1, page = 0, size = 10) {
  return await apiClient.get('/ingredientes', { params: { despensaId, page, size } });
}

export async function agregarIngrediente(despensaId, descripcion, cantidadStock) {
  return await apiClient.post('/ingredientes', { descripcion, cantidadStock }, { params: { despensaId } });
}

export async function actualizarStock(despensaId, id, cantidadStock) {
  return await apiClient.put(`/ingredientes/${id}`, { cantidadStock }, { params: { despensaId } });
}

export async function borrarIngrediente(despensaId, id) {
  return await apiClient.delete(`/ingredientes/${id}`, { params: { despensaId } });
}

export async function obtenerGerente(idDespensa = 1) {
  return await apiClient.get(`/despensa/${idDespensa}/gerente`);
}
