import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  const container = document.querySelector(`[data-tipo="${containerId}"]`);
  if (!container) {
    console.error('Contenedor no encontrado:', containerId);
    throw new Error('Contenedor no encontrado');
  }

  // Mostrar loader
  showLoader(container);

  try {
    // Obtener productos
    let products = await fetchProducts(categoria);
    
    // Renderizar productos
    renderProducts(container, products);
    
    return products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    container.innerHTML = '<p>Error al cargar los productos. Por favor, intente nuevamente.</p>';
    throw error;
  }
};

const showLoader = (container) => {
  container.innerHTML = `
    <div class="loader">
      <div class="scanner">
        <h1 class="scanner__loading">Cargando productos...</h1>
      </div>
    </div>
  `;
};

const fetchProducts = async (categoria) => {
  console.log('Iniciando fetchProducts con categoría:', categoria);
  let products;
  
  if (categoria) {
    console.log('Solicitando productos de categoría:', categoria);
    products = await productService.getProductsByCategory(categoria);
    console.log(`Recibidos ${products.length} productos de la categoría ${categoria}`);
  } else {
    console.log('Solicitando todos los productos');
    products = await productService.productList();
  }

  if (!products || products.length === 0) {
    console.log('No se encontraron productos');
    return [];
  }

  console.log('Productos obtenidos:', products);
  return products;
};

const renderProducts = (container, products) => {
  if (!products || products.length === 0) {
    container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
    return;
  }

  container.innerHTML = '';
  products.forEach(product => {
    const productElement = createLineUserView(product.nombre, product.precio, product.id, product.imagen);
    container.appendChild(productElement);
  });
};

export const createLineUserView = (nombre, precio, id, imagen) => {
  const line = document.createElement('article');
  line.classList.add('mas-vistos__card');

  const content = `
    <img
      src="${imagen}"
      alt="${nombre}"
      class="mas-vistos__card__img"
      onerror="this.src='../assets/img/producto-no-encontrado.png';"
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
