import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

// Función para mostrar los productos más vistos

window.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, starting renderProducts')
  renderProducts()
})

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
    console.log('Fetching products...')
    const productList = await productService.getLimitProduct()
    console.log('Products received:', productList)
    div.replaceChildren()
    if (productList && productList.length > 0) {
      productList.forEach(data => {
        const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(newLine)
      })
    } else {
      throw new Error('No se encontraron productos')
    }
  } catch (error) {
    console.error('Error al cargar productos:', error)
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error al cargar los productos. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
}
