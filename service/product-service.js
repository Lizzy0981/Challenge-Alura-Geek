const API_URL = 'https://alurageek-api-odin.onrender.com';

const handleResponse = async (response) => {
  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Obtener todos los productos
const productList = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en productList:', error);
    throw error;
  }
};

// Nueva función específica para obtener productos por categoría
const getProductsByCategory = async (categoria) => {
  try {
    console.log('Buscando productos de categoría:', categoria);
    const allProducts = await productList();
    const filteredProducts = allProducts.filter(product => 
      product.categoria.toLowerCase() === categoria.toLowerCase()
    );
    console.log('Productos filtrados:', filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error('Error en getProductsByCategory:', error);
    throw error;
  }
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
  getProductsByCategory,
  createProduct,
  deleteProduct,
  productDetail,
  updateProduct,
  getLimitProduct
};
