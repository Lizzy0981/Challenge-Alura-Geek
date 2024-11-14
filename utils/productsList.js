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
    console.log('Productos obtenidos:', products);
    
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
        <h1 class="scanner__loading">Loading...</h1>
      </div>
    </div>
  `;
};

const fetchProducts = async (categoria) => {
  try {
    let products;
    
    if (categoria) {
      console.log('Solicitando productos de categoría:', categoria);
      // Asegurarse de que la categoría esté en minúsculas para la comparación
      const categoriaLower = categoria.toLowerCase();
      if (categoriaLower === 'laptos' || 
          categoriaLower === 'diversos' || 
          categoriaLower === 'consolas' || 
          categoriaLower === 'star-wars') {
        products = await productService.getProductsByCategory(categoriaLower);
      } else {
        console.error('Categoría no válida:', categoria);
        return [];
      }
    } else {
      console.log('Solicitando todos los productos');
      products = await productService.productList();
    }

    console.log('Productos recibidos:', products);
    return products || [];
  } catch (error) {
    console.error('Error en fetchProducts:', error);
    throw error;
  }
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

  line.innerHTML = `
    <img
      src="${imagen}"
      alt="${nombre}"
      class="mas-vistos__card__img"
    />
    <div class="mas-vistos__card__details">
      <h2 class="mas-vistos__card__name">${nombre}</h2>
      <p class="mas-vistos__card__price">$${precio}</p>
      <a href="../screens/descripcion-producto.html?id=${id}" class="mas-vistos__card__link">Ver Producto</a>
    </div>
  `;

  return line;
};
