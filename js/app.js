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

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.querySelector('[data-tipo="productCards"]');
  
  if (productContainer) {
    const currentPath = window.location.pathname.toLowerCase();
    let categoria = null;
    
    console.log('Ruta actual:', currentPath);

    if (currentPath.includes('/screens/diversos')) {
      categoria = 'diversos';
    } else if (currentPath.includes('/screens/consolas')) {
      categoria = 'consolas';
    } else if (currentPath.includes('/screens/star-wars')) {
      categoria = 'star-wars';
    } else if (currentPath.includes('/screens/laptos')) {
      categoria = 'laptos';
    }
    
    console.log('Categoría detectada:', categoria);
    
    if (categoria) {
      // Si estamos en una página de categoría
      console.log('Cargando productos de categoría:', categoria);
      loadProducts('productCards', categoria)
        .then(products => {
          console.log(`Productos cargados para ${categoria}:`, products);
        })
        .catch(error => {
          console.error(`Error al cargar productos de ${categoria}:`, error);
        });
    } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
      // Si estamos en la página principal, cargar solo productos destacados
      console.log('Cargando productos destacados');
      loadProducts('productCards', 'destacados')
        .then(products => {
          console.log('Productos destacados cargados:', products);
        })
        .catch(error => {
          console.error('Error al cargar productos destacados:', error);
        });
    }
  }
});
