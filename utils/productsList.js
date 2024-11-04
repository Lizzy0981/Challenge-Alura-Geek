import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  const container = document.querySelector(`[data-tipo="${containerId}"]`);

  if (!container) {
    console.error('Contenedor no encontrado:', containerId);
    throw new Error('Contenedor no encontrado');
  }

  // Mostrar el loader
  container.innerHTML = `
    <div class="loader">
      <div class="scanner">
        <h1 class="scanner__loading">Loading...</h1>
      </div>
    </div>
  `;

  try {
    let products = await productService.productList();
    
    // Filtrar por categoría si se especifica una
    if (categoria) {
      console.log('Filtrando por categoría:', categoria);
      products = products.filter(product => 
        product.categoria.toLowerCase() === categoria.toLowerCase()
      );
      console.log('Productos filtrados:', products);
    }

    if (!products || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
      return [];
    }

    // Ocultar el loader y mostrar los productos
    container.innerHTML = '';
    products.forEach(product => {
      const productElement = createLineUserView(product.nombre, product.precio, product.id, product.imagen);
      container.appendChild(productElement);
    });
    return products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    container.innerHTML = '<p>Error al cargar los productos. Por favor, intente nuevamente.</p>';
    throw error;
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

  // Añadir una pequeña demora para permitir que las animaciones se apliquen
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  }, 50);

  return line;
};
