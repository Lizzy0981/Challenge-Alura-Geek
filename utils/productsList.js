import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  try {
    // 1. Obtener el contenedor
    const container = document.querySelector(`[data-tipo="${containerId}"]`);
    if (!container) {
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }

    // 2. Mostrar loader
    container.innerHTML = `
      <div class="loader">
        <p>Cargando productos...</p>
      </div>
    `;

    // 3. Obtener productos
    const products = await fetchProducts(categoria);
    console.log('Productos obtenidos:', products);

    // 4. Renderizar productos
    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="no-products">
          <p>No hay productos disponibles en esta categoría.</p>
        </div>
      `;
      return;
    }

    // 5. Limpiar contenedor y renderizar productos
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

const fetchProducts = async (categoria) => {
  try {
    if (categoria) {
      console.log('Solicitando productos de categoría:', categoria);
      const categoryProducts = await productService.getProductsByCategory(categoria);
      console.log('Productos de categoría obtenidos:', categoryProducts);
      return categoryProducts;
    } else {
      console.log('Solicitando todos los productos');
      const allProducts = await productService.productList();
      console.log('Todos los productos obtenidos:', allProducts);
      return allProducts;
    }
  } catch (error) {
    console.error('Error en fetchProducts:', error);
    throw error;
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
      onerror="this.src='../assets/img/producto-no-encontrado.png';"
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
