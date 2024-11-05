import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  try {
    const container = document.querySelector(`[data-tipo="${containerId}"]`);
    if (!container) {
      console.error('Contenedor no encontrado con selector:', `[data-tipo="${containerId}"]`);
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }

    console.log('Contenedor encontrado:', container);

    // Mostrar loader
    container.innerHTML = `
      <div class="loader">
        <p>Cargando productos...</p>
      </div>
    `;

    // Obtener productos
    let products;
    if (categoria) {
      console.log('Solicitando productos de categoría:', categoria);
      products = await productService.getProductsByCategory(categoria);
    } else {
      console.log('Solicitando todos los productos');
      products = await productService.productList();
    }

    console.log('Productos obtenidos:', products);

    // Validar si hay productos
    if (!products || products.length === 0) {
      console.log('No se encontraron productos');
      container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
      return;
    }

    // Renderizar productos
    console.log('Iniciando renderizado de', products.length, 'productos');
    container.innerHTML = '';
    products.forEach((product, index) => {
      console.log(`Renderizando producto ${index + 1}:`, product.nombre);
      const productElement = createProductCard(product);
      container.appendChild(productElement);
    });

    console.log('Renderizado completado');

  } catch (error) {
    console.error('Error detallado en loadProducts:', error);
    const container = document.querySelector(`[data-tipo="${containerId}"]`);
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

const createProductCard = (product) => {
  try {
    console.log('Creando tarjeta para producto:', product.nombre);
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
          href="../screens/descripcion-producto.html?id=${product.id}"
        >Ver Producto</a>
      </div>
    `;

    console.log('Tarjeta creada exitosamente');
    return card;
  } catch (error) {
    console.error('Error al crear tarjeta de producto:', error);
    throw error;
  }
};
