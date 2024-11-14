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

// Manejar clicks en las categorías
const handleCategoryClicks = () => {
  const categoryLinks = document.querySelectorAll('.categoria__card a[categoria]');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const categoria = event.currentTarget.getAttribute('categoria');
      console.log('Navegando a categoría:', categoria);
    });
  });
};

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.querySelector('[tipo="productCards"]');
  
  if (productContainer) {
    const currentPath = window.location.pathname.toLowerCase();
    let categoria = null;
    
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
      // Si estamos en una página de categoría
      loadProducts('productCards', categoria);
    } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
      // Si estamos en la página principal, solo cargamos productos destacados
      loadProducts('productCards', 'destacados');
    }
  }

  // Inicializar los click handlers para las categorías
  handleCategoryClicks();
});
