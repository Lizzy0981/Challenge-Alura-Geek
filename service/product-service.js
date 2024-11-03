const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://alurageek-api-odin.onrender.com'
  : 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Obtener todos los productos
const productList = () => fetch(`${API_URL}/productos`).then(handleResponse);

// Crear un producto
const createProduct = (imagen, nombre, precio, categoria, descripcion) => {
  return fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion })
  }).then(handleResponse);
};

// Eliminar un producto
const deleteProduct = (id) => {
  return fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE'
  }).then(handleResponse);
};

// Obtener el detalle de un producto
const productDetail = (id) => {
  return fetch(`${API_URL}/productos/${id}`).then(handleResponse);
};

// Actualizar un producto
const updateProduct = (imagen, nombre, precio, categoria, descripcion, id) => {
  return fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion })
  }).then(handleResponse);
};

// Obtener una cantidad limitada de productos
const getLimitProduct = () => {
  console.log('Fetching limited products...');
  return fetch(`${API_URL}/productos?_limit=4`)
    .then(response => {
      console.log('Response status:', response.status);
      return handleResponse(response);
    })
    .then(data => {
      console.log('Received data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error in getLimitProduct:', error);
      throw error;
    });
};

export const productService = {
  productList,
  createProduct,
  deleteProduct,
  productDetail,
  updateProduct,
  getLimitProduct
};
