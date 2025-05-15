import axios from 'axios';

// Creamos el cliente apuntando al root de tu FastAPI
const api = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTS_API_URL,  
  headers: { 'Content-Type': 'application/json' },
});


// Ahora cada llamada incluye explícitamente "/products"
export const getProducts   = () => api.get('/api/catalog-products');
export const getProduct    = (id) => api.get(`/api/catalog-products/${id}`);
export const createProduct = (data) => api.post('/api/catalog-products', data);
export const updateProduct = (id, data) => api.put(`/api/catalog-products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/catalog-products/${id}`);
