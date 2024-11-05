const API_URL = 'https://alurageek-api-odin.onrender.com';

const handleResponse = async (response) => {
  console.log('Status:', response.status);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error Response:', errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Obtener todos los productos
const productList = () => {
  console.log('Fetching from:', `${API_URL}/productos`);
  return fetch(`${API_URL}/productos`)
    .then(handleResponse)
    .catch(error => {
      console.error('Error en productList:', error);
      throw error;
    });
};

// Obtener productos por categoría
const getProductsByCategory = (categoria) => {
  console.log('Fetching products by category:', categoria);
  return fetch(`${API_URL}/productos?categoria=${categoria}`)
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching by category:', error);
      throw error;
    });
};

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

// Obtener productos limitados
const getLimitProduct = () => {
  console.log('Fetching limited products...');
  return fetch(`${API_URL}/productos?_limit=4`)
    .then(handleResponse)
    .then(data => {
      console.log('Received limited products:', data);
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
  getLimitProduct,
  getProductsByCategory  // Agregamos la nueva función
};
