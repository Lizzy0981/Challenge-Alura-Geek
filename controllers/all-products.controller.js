import { createLineUserView, loadProducts } from '../utils/productsList.js'
import { productService } from '../service/product-service.js'

const div = document.querySelector('[data-tipo="productCards"]')
const searchInput = document.querySelector('[data-tipo="search"]')

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    renderProductsByCategory(category);
  } else {
    renderAllProducts();
  }
});

const renderAllProducts = async () => {
  try {
    await loadProducts('productCards');
  } catch (error) {
    handleError(error);
  }
}

const renderProductsByCategory = async (category) => {
  const newDiv = document.createElement('div')
  const loading = `
  <div class="loader">
    <div class="scanner">
      <h1 class="scanner__loading">Loading...</h1>
    </div>
  </div>
  `
  newDiv.innerHTML = loading
  div.appendChild(newDiv)

  try {
    const allProducts = await productService.productList();
    const filteredProducts = allProducts.filter(product => product.categoria.toLowerCase() === category.toLowerCase());
    
    div.innerHTML = '';
    if (filteredProducts.length === 0) {
      div.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
    } else {
      filteredProducts.forEach(data => {
        const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(newLine)
      });
    }
  } catch (error) {
    handleError(error);
  }
}

const handleError = (error) => {
  console.error('Error:', error);
  Swal.fire({
    title: 'Hubo un error!!!',
    text: 'Se produjo un error al cargar los productos. Intente más tarde',
    icon: 'error',
    confirmButtonText: 'Continuar'
  }).then(() => {
    window.location.href = '../index.html'
  });
}

// Función para realizar el filtrado de datos
searchInput.addEventListener('keyup', async () => {
  const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  try {
    const products = await productService.productList();
    if (searchValue !== '' && searchValue !== null) {
      div.innerHTML = '';
      const newProducts = products.filter(product => 
        product.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue) ||
        product.categoria.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue)
      )
      if (newProducts.length === 0) {
        Swal.fire({
          title: 'No se encontró el producto',
          text: 'El producto que busca no se encuentra',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }
      newProducts.forEach(data => {
        const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(line)
      })
    } else {
      renderAllProducts();
    }
  } catch (error) {
    handleError(error);
  }
})
