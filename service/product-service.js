const API_URL = 'https://alurageek-api-odin.onrender.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Obtener todos los productos
const productList = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    const data = await handleResponse(response);
    console.log('Productos obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error en productList:', error);
    throw error;
  }
};

// Función mejorada para obtener productos por categoría
const getProductsByCategory = async (categoria) => {
  try {
    console.log('Buscando productos de categoría:', categoria);
    // Primero obtenemos todos los productos
    const allProducts = await productList();
    
    // Filtrado en el cliente
    const filteredProducts = allProducts.filter(product => 
      product.categoria && 
      product.categoria.toLowerCase().trim() === categoria.toLowerCase().trim()
    );
    
    console.log(`Encontrados ${filteredProducts.length} productos en la categoría ${categoria}`);
    return filteredProducts;
  } catch (error) {
    console.error('Error en getProductsByCategory:', error);
    throw error;
  }
};

// Crear un producto
const createProduct = async (imagen, nombre, precio, categoria, descripcion) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error en createProduct:', error);
    throw error;
  }
};

// Eliminar un producto
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    throw error;
  }
};

// Obtener el detalle de un producto
const productDetail = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en productDetail:', error);
    throw error;
  }
};

// Actualizar un producto
const updateProduct = async (imagen, nombre, precio, categoria, descripcion, id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error en updateProduct:', error);
    throw error;
  }
};

// Obtener productos limitados
const getLimitProduct = async () => {
  try {
    console.log('Fetching limited products...');
    const response = await fetch(`${API_URL}/productos?_limit=4`);
    const data = await handleResponse(response);
    console.log('Received limited products:', data);
    return data;
  } catch (error) {
    console.error('Error in getLimitProduct:', error);
    throw error;
  }
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
