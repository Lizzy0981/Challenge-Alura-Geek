import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

// Constantes
const CATEGORIA = 'star-wars'
const div = document.querySelector('[data-tipo="productCards"]')
const searchInput = document.querySelector('[data-tipo="search"]')

// Validación de elementos DOM
if (!div) {
  console.error('No se encontró el elemento con data-tipo="productCards"')
}
if (!searchInput) {
  console.error('No se encontró el elemento con data-tipo="search"')
}

// Función mejorada que devuelve una nueva lista con productos filtrados por categoría
const loadProductsFilter = async () => {
  try {
    console.log('Iniciando carga de productos...')
    const allProducts = await productService.productList()

    if (!allProducts || !Array.isArray(allProducts)) {
      console.error('No se recibieron productos válidos:', allProducts)
      throw new Error('No se recibieron productos válidos del servidor')
    }

    console.log('Total de productos recibidos:', allProducts.length)

    const category = allProducts.filter(data => {
      if (!data || typeof data.categoria !== 'string') {
        console.warn('Producto con formato inválido:', data)
        return false
      }
      return data.categoria.toLowerCase() === CATEGORIA.toLowerCase()
    })

    console.log(`Productos de ${CATEGORIA} encontrados:`, category)
    return category
  } catch (error) {
    console.error('Error al cargar productos:', error)
    throw error
  }
}

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
    const productos = await loadProductsFilter()
    div.replaceChildren()

    if (!productos || productos.length === 0) {
      div.innerHTML = `<p class="no-products-message">No hay productos disponibles en la categoría ${CATEGORIA}.</p>`
      return
    }

    productos.forEach(data => {
      const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
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

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando carga de productos...')
  renderProducts()
})

// Búsqueda con el mismo formato que ya tienes
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
        await Swal.fire({
          title: 'No se encontró el producto',
          text: 'El producto que busca no se encuentra',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
        await renderProducts()
      } else {
        filterCategories.forEach(data => {
          const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
          div.appendChild(line)
        })
      }
    } else {
      div.replaceChildren()
      renderProducts()
    }
  } catch (error) {
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
