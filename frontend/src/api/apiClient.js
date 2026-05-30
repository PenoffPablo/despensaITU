import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => {
    // Si el backend responde con éxito, extraemos la data automáticamente
    return response.data;
  },
  (error) => {
    // Captura centralizada de cualquier error 4xx o 5xx
    const mensaje = error.response?.data?.message || error.message || 'Ocurrió un error inesperado';
    console.error("Error global de API interceptado:", mensaje);
    
    // Rechazamos la promesa para que el frontend (React/Vue) sepa que la petición falló
    return Promise.reject(new Error(mensaje));
  }
);

export default apiClient;
