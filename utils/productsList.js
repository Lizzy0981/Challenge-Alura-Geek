import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  const container = document.querySelector(`[data-tipo="${containerId}"]`);
  if (!container) {
    console.error('Contenedor no encontrado:', containerId);
    return;
  }

  container.innerHTML = '<p>Cargando productos...</p>';

  try {
    let products;
    
    if (categoria) {
      console.log('Cargando productos de categoría:', categoria);
      products = await productService.getProductsByCategory(categoria);
    } else {
      console.log('Cargando todos los productos');
      products = await productService.productList();
    }

    console.log('Productos recibidos:', products);

    if (!products || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    renderProducts(container, products);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    container.innerHTML = '<p>Error al cargar los productos. Por favor, intente nuevamente.</p>';
  }
};

const renderProducts = (container, products) => {
  container.innerHTML = '';
  
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
};

const createProductCard = (product) => {
  const article = document.createElement('article');
  article.className = 'mas-vistos__card';
  
  article.innerHTML = `
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
        href="../screens/descripcion-producto.html?id=${product.id}"
      >Ver Producto</a>
    </div>
  `;

  return article;
};
