import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  try {
    const container = document.querySelector(`[data-tipo="${containerId}"]`);
    if (!container) {
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }

    // Mostrar loader
    container.innerHTML = `
      <div class="loader">
        <p>Cargando productos...</p>
      </div>
    `;

    // Obtener productos
    let products;
    if (categoria) {
      products = await productService.getProductsByCategory(categoria);
    } else {
      products = await productService.productList();
    }

    console.log('Productos obtenidos:', products);

    // Validar si hay productos
    if (!products || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
      return;
    }

    // Renderizar productos
    container.innerHTML = '';
    products.forEach(product => {
      const productElement = createProductCard(product);
      container.appendChild(productElement);
    });

  } catch (error) {
    console.error('Error en loadProducts:', error);
    const container = document.querySelector(`[data-tipo="${containerId}"]`);
    if (container) {
      container.innerHTML = `
        <div class="error">
          <p>Error al cargar los productos. Por favor, intente nuevamente.</p>
        </div>
      `;
    }
  }
};

const createProductCard = (product) => {
  const card = document.createElement('article');
  card.className = 'mas-vistos__card';
  
  card.innerHTML = `
    <img
      src="${product.imagen}"
      alt="${product.nombre}"
      class="mas-vistos__card__img"
    />
    <div class="mas-vistos__card__details">
      <h2 class="mas-vistos__card__name">${product.nombre}</h2>
      <p class="mas-vistos__card__price">$${product.precio}</p>
      <a
        class="mas-vistos__card__link"
        href="descripcion-producto.html?id=${product.id}"
      >Ver Producto</a>
    </div>
  `;

  return card;
};
