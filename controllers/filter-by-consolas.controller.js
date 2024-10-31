import { createLineUserView } from '../utils/productsList.js'
import { productService } from '../service/product-service.js'

const div = document.querySelector('[data-tipo="productCards"]')
const searchInput = document.querySelector('[data-tipo="search"]')

// Función que devuelve una nueva lista con productos filtrados por categoría
const loadProductsFilter = async () => {
  try {
    console.log('Obteniendo productos...');
    const products = await productService.productList();
    console.log('Productos obtenidos:', products);
    
    const category = products.filter(data => data.categoria === 'consolas');
    console.log('Productos filtrados por consolas:', category);
    
    return category;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Cargado, iniciando renderProducts()');
  renderProducts();
})

// Función para mostrar los productos filtrados
const renderProducts = async () => {
  console.log('Iniciando renderProducts');
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
    console.log('Intentando cargar productos filtrados...');
    const consolas = await loadProductsFilter()
    console.log('Productos de consolas obtenidos:', consolas);
    
    div.replaceChildren()
    
    if (!consolas || consolas.length === 0) {
      console.log('No se encontraron productos de consolas');
      div.innerHTML = '<p>No hay productos en la categoría consolas.</p>'
      return;
    }

    consolas.forEach(data => {
      console.log('Renderizando producto:', data.nombre);
      const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
    console.error('Error al renderizar productos:', error);
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
}

// El resto del código permanece igual...

// Función para mostrar los productos filtrados
const renderProducts = async () => {
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
    const consolas = await loadProductsFilter()
    div.replaceChildren()
    
    if (consolas.length === 0) {
      div.innerHTML = '<p>No hay productos en la categoría consolas.</p>'
      return;
    }

    consolas.forEach(data => {
      const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
    console.error('Error al renderizar productos:', error);
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
}

// Función para filtrar y mostrar la búsqueda dentro de una categoría
searchInput.addEventListener('keyup', async () => {
  const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  
  try {
    const category = await loadProductsFilter()

    if (searchValue !== '' && searchValue !== null) {
      div.replaceChildren()
      const filterCategories = category.filter(item => 
        item.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue)
      )
      
      if (filterCategories.length === 0) {
        Swal.fire({
          title: 'No se encontró el producto',
          text: 'El producto que busca no se encuentra',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }

      filterCategories.forEach(data => {
        const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(line)
      })
    } else {
      div.replaceChildren()
      renderProducts()
    }
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
})
