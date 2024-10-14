import { productService } from '../service/product-service.js';

// Función para tomar todos los productos
export const loadProducts = async () => {
  try {
    const products = await productService.productList();
    return products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    throw error; // Re-lanzamos el error para manejarlo en el componente que llama a esta función
  }
};

// Función para crear una estructura article para mostrar los productos
export const createLineUserView = (nombre, precio, id, imagen) => {
  const line = document.createElement('article');
  line.classList.add('mas-vistos__card');

  const content = `
    <img
      src="${imagen}"
      alt="${nombre}"
      class="mas-vistos__card__img"
      onerror="this.src='path/to/fallback-image.jpg';"
    />
    <div class="mas-vistos__card__details">
      <h2 class="mas-vistos__card__name">${nombre}</h2>
      <p class="mas-vistos__card__price">$${precio}</p>
      <a
        class="mas-vistos__card__link"
        href="../screens/descripcion-producto.html?id=${id}"
      >Ver Producto</a>
    </div>
  `;

  line.innerHTML = content;

  return line;
};
