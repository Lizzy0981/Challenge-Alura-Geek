import { productService } from '../service/product-service.js'
import { loadProducts } from '../utils/productsList.js'

const verificarAuth = () => {
    const adminData = JSON.parse(sessionStorage.getItem('adminData'))
    if (!adminData || !adminData.isLoggedIn) {
        window.location.href = './login.html'
        return false
    }
    return true
}

const div = document.querySelector('[data-tipo="tarjetas"]')
const searchInput = document.querySelector('[data-tipo="search"]')

const createLine = (nombre, precio, id, imagen) => {
  const line = document.createElement('article')
  line.classList.add('lista-productos__card')
  const content = `
    <img
      src="${imagen}"
      alt="${nombre}"
      class="lista-productos__card__img" />
    <div class="lista-productos__card__details">
      <h2 class="lista-productos__card__name">${nombre}</h2>
      <p class="lista-productos__card__price">$${precio}</p>
      <p class="lista-productos__card__id">#${id}</p>
      <div class="lista-productos__card_details__btn">
        <a
          class="lista-productos__card__edit btn"
          href="../screens/editar-producto.html?id=${id}"
          >Editar</a
        >
        <button class="lista-productos__card__delete btn" id=${id}>Eliminar</button>
      </div>
    </div>
  `
  line.innerHTML = content

  const btn = line.querySelector('button')
  btn.addEventListener('click', async () => {
    const id = btn.id
    try {
      await productService.deleteProduct(id)
      Swal.fire({
        title: 'Se eliminó el producto con éxito!!!',
        text: 'El producto fue eliminado con éxito',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        window.location.href = '../screens/lista-productos-admin.html'
      })
    } catch (error) {
      console.error("Error al eliminar:", error)
      Swal.fire({
        title: 'Hubo un error!!!',
        text: 'Se produjo un error. Intente más tarde',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    }
  })

  return line
}

const render = async () => {
  if (!verificarAuth()) return

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
    console.log("Intentando cargar productos...")
    const productList = await loadProducts()
    console.log("Productos cargados:", productList)
    
    if (!productList || productList.length === 0) {
      console.log("No se encontraron productos")
      div.innerHTML = '<p>No hay productos disponibles.</p>'
      return
    }

    div.replaceChildren()
    productList.forEach(data => {
      const newLine = createLine(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
    console.error("Error en render:", error)
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error al cargar los productos. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  console.log("Página cargada, iniciando render...")
  render()
})

searchInput?.addEventListener('keyup', async () => {
  if (!verificarAuth()) return

  try {
    const products = await loadProducts()
    const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
    
    if (searchValue !== '') {
      div.replaceChildren()
      const newProducts = products.filter(product => 
        product.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue)
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
        const line = createLine(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(line)
      })
    } else {
      div.replaceChildren()
      render()
    }
  } catch (error) {
    console.error("Error en búsqueda:", error)
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error en la búsqueda. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
})
