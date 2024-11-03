import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

// AQUÍ VA EL PRIMER LOG
console.log('Controlador de diversos cargado')

const searchInput = document.querySelector('[data-tipo="search"]')
const div = document.querySelector('[data-tipo="productCards"]')

// AQUÍ VA LA FUNCIÓN MODIFICADA loadProductsFilter
const loadProductsFilter = async () => {
  try {
    console.log('Obteniendo productos...')
    const productList = await productService.productList()
    console.log('Productos obtenidos:', productList)
    const category = productList.filter(data => data.categoria === 'diversos')
    console.log('Productos filtrados:', category)
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
    const diversos = await loadProductsFilter()
    div.replaceChildren()
    if (diversos && diversos.length > 0) {
      diversos.forEach(data => {
        const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(newLine)
      })
    } else {
      div.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>'
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
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando carga de productos diversos')
  renderProducts()
})

// Búsqueda sin cambios...
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
