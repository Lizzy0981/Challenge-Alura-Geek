import { validaInput, validaText } from './validaciones.js';
import { loadProducts } from './productsList.js';

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

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Buscar el contenedor por el atributo data-tipo
  const productContainer = document.querySelector('[data-tipo="productCards"]');
  
  if (productContainer) {
    // Obtener la categoría basada en la URL actual
    const currentPath = window.location.pathname;
    let categoria = null;
    
    if (currentPath.includes('diversos.html')) {
      categoria = 'diversos';
    } else if (currentPath.includes('consolas.html')) {
      categoria = 'consolas';
    } else if (currentPath.includes('star-wars.html')) {
      categoria = 'star-wars';
    } else if (currentPath.includes('laptos.html')) {
      categoria = 'laptos';
    }
    
    // Cargar productos con la categoría correspondiente
    loadProducts('productCards', categoria);
  }
});
