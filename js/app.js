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

// Función para manejar el clic en los enlaces de categorías
const handleCategoryClick = () => {
  const categoryLinks = document.querySelectorAll('[data-categoria]');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const categoria = event.currentTarget.dataset.categoria;
      const productContainer = document.querySelector('[data-tipo="productCards"]');
      
      if (productContainer) {
        console.log('Cargando productos de categoría:', categoria);
        loadProducts('productCards', categoria);
      }
    });
  });
};

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.querySelector('[data-tipo="productCards"]');
  
  if (productContainer) {
    const currentPath = window.location.pathname.toLowerCase();
    let categoria = null;
    
    console.log('Ruta actual:', currentPath);

    if (currentPath.includes('/screens/diversos.html')) {
      categoria = 'diversos';
    } else if (currentPath.includes('/screens/consolas.html')) {
      categoria = 'consolas';
    } else if (currentPath.includes('/screens/star-wars.html')) {
      categoria = 'star-wars';
    } else if (currentPath.includes('/screens/laptos.html')) {
      categoria = 'laptos';
    }
    
    console.log('Categoría detectada:', categoria);
    
    if (categoria) {
      loadProducts('productCards', categoria);
    } else {
      loadProducts('productCards');
    }
  }

  // Inicializar el manejador de clics en categorías
  handleCategoryClick();
});
