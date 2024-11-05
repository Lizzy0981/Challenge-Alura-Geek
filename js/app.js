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
  const currentUrl = window.location.href.toLowerCase();
  
  console.log({
    rutaCompleta: currentUrl,
    pathname: currentPath
  });

  const categorias = {
    diversos: 'diversos',
    consolas: 'consolas',
    'star-wars': 'star-wars',
    laptos: 'laptos'
  };

  for (const [key, value] of Object.entries(categorias)) {
    if (currentPath.includes(key)) {
      console.log('Categoría encontrada:', value);
      return value;
    }
  }

  console.log('No se encontró categoría específica');
  return null;
};

// Función para inicializar la carga de productos
const initializeProducts = async () => {
  try {
    const productContainer = document.querySelector('[data-tipo="productCards"]');
    
    if (!productContainer) {
      console.log('No se encontró el contenedor de productos en esta página');
      return;
    }

    const categoria = getCategoriaFromUrl();
    console.log('Categoría detectada:', categoria);

    if (categoria) {
      console.log('Cargando productos de categoría:', categoria);
      await loadProducts('productCards', categoria);
    } else {
      console.log('Cargando todos los productos');
      await loadProducts('productCards');
    }
  } catch (error) {
    console.error('Error en la inicialización de productos:', error);
    const container = document.querySelector('[data-tipo="productCards"]');
    if (container) {
      container.innerHTML = `
        <div class="error">
          <p>Error al cargar los productos. Por favor, intente nuevamente.</p>
          <p>Detalles: ${error.message}</p>
        </div>
      `;
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado - Iniciando aplicación');
  initializeProducts();
});
