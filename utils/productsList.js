import { productService } from '../service/product-service.js';

export const loadProducts = async (containerId, categoria = null) => {
  console.log('LoadProducts llamado con:', { containerId, categoria });
  
  const container = document.querySelector(`[data-tipo="${containerId}"]`);
  if (!container) {
    console.error('Contenedor no encontrado:', containerId);
    throw new Error('Contenedor no encontrado');
  }

  container.innerHTML = `
    <div class="loader">
      <div class="scanner">
        <h1 class="scanner__loading">Loading...</h1>
      </div>
    </div>
  `;

  try {
    // Obtenemos todos los productos
    const allProducts = await productService.productList();

    // Filtramos los productos según la categoría
    const products = categoria 
      ? allProducts.filter(product => product.categoria === categoria)
      : allProducts;

    console.log(`Mostrando ${products.length} productos de categoría: ${categoria || 'todas'}`);

    if (!products || products.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
      return;
    }

    container.innerHTML = '';
    products.forEach(product => {
      const productElement = createLineUserView(product.nombre, product.precio, product.id, product.imagen);
      container.appendChild(productElement);
    });

  } catch (error) {
    console.error('Error al cargar los productos:', error);
    container.innerHTML = '<p>Error al cargar los productos. Por favor, intente nuevamente.</p>';
  }
};

export const createLineUserView = (nombre, precio, id, imagen) => {
  const line = document.createElement('article');
  line.classList.add('mas-vistos__card');

  const content = `
    <img
      src="${imagen}"
      alt="${nombre}"
      class="mas-vistos__card__img"
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
