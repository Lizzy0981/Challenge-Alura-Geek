import { validaInput, validaText } from './validaciones.js';
import { loadProducts } from '../utils/productsList.js';

// Seleccionando los inputs y los textareas
const inputs = document.querySelectorAll('.input, .input__inicio, .input__agregar');
const textareaContacto = document.querySelector('.textarea-input');
const textareaDescripcion = document.querySelector('.textarea__input');

// Función para agregar validación a un elemento
const addValidation = (element, validationFunction) => {
  element.addEventListener('blur', (event) => validationFunction(event.target));
};

// Agregar validación a todos los inputs
inputs.forEach(input => addValidation(input, validaInput));

// Agregar validación al textarea de contacto
if (textareaContacto) {
  addValidation(textareaContacto, validaText);
}

// Agregar validación al textarea de descripción si existe
if (textareaDescripcion) {
  addValidation(textareaDescripcion, validaText);
}

// Función para determinar la categoría basada en la URL
const getCategoriaFromUrl = () => {
  const currentPath = window.location.pathname.toLowerCase();
  console.log('Ruta actual:', currentPath);

  if (currentPath.includes('/screens/diversos.html')) {
    return 'diversos';
  } else if (currentPath.includes('/screens/consolas.html')) {
    return 'consolas';
  } else if (currentPath.includes('/screens/star-wars.html')) {
    return 'star-wars';
  } else if (currentPath.includes('/screens/laptos.html')) {
    return 'laptos';
  }
  return null;
};

// Función para inicializar la carga de productos
const initializeProducts = async () => {
  const productContainer = document.querySelector('[data-tipo="productCards"]');
  
  if (productContainer) {
    const categoria = getCategoriaFromUrl();
    console.log('Categoría detectada:', categoria);

    try {
      if (categoria) {
        await loadProducts('productCards', categoria);
      } else {
        await loadProducts('productCards');
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      productContainer.innerHTML = '<p>Error al cargar los productos. Por favor, intente nuevamente.</p>';
    }
  }
};

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar la carga de productos
  initializeProducts();
});
