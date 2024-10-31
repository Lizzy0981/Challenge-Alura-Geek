import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')
const searchInput = document.querySelector('[data-tipo="search"]')

// Función que devuelve una nueva lista con productos filtrados por categoría
const loadProductsFilter = async () => {
  try {
    const allProducts = await productService.productList();
    const category = allProducts.filter(data => data.categoria === 'consolas');
    console.log('Productos de consolas encontrados:', category); // Mantenemos el log para debugging
    return category;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    throw error;
  }
}

// Componente de loading
const createLoadingElement = () => {
  const newDiv = document.createElement('div')
  newDiv.innerHTML = `
    <div class="loader">
      <div class="scanner">
        <h1 class="scanner__loading">Loading...</h1>
      </div>
    </div>
  `
  return newDiv
}

// Manejo de errores centralizado
const handleError = (error, message = 'Se produjo un error. Intente más tarde') => {
  console.error(error);
  return Swal.fire({
    title: 'Hubo un error!!!',
    text: message,
    icon: 'error',
    confirmButtonText: 'Continuar'
  }).then(() => {
    window.location.href = '../index.html'
  })
}

// Función para mostrar los productos filtrados
const renderProducts = async () => {
  const loadingElement = createLoadingElement()
  div.appendChild(loadingElement)

  try {
    const consolas = await loadProductsFilter()
    div.replaceChildren()
    
    if (consolas.length === 0) {
      div.innerHTML = '<p>No hay productos en la categoría consolas.</p>'
      return
    }

    consolas.forEach(data => {
      const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
    handleError(error)
  }
}

// Inicialización al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  renderProducts()
})

// Función para filtrar y mostrar la búsqueda dentro de una categoría
searchInput.addEventListener('keyup', async () => {
  // Mantenemos exactamente la misma lógica de sanitización del input
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
      }

      filterCategories.forEach(data => {
        const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(line)
      })
    } else {
      div.replaceChildren()
      await renderProducts()
    }
  } catch (error) {
    handleError(error, 'Error en la búsqueda. Intente más tarde')
  }
})
