import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

// Constantes
const CATEGORIA = 'consolas'
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
    
    // Validación de datos recibidos
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

// Componente de loading mejorado
const createLoadingElement = () => {
  const newDiv = document.createElement('div')
  newDiv.className = 'loading-container' // Agregar clase para mejor manipulación
  newDiv.innerHTML = `
    <div class="loader">
      <div class="scanner">
        <h1 class="scanner__loading">Cargando productos...</h1>
      </div>
    </div>
  `
  return newDiv
}

// Manejo de errores mejorado con tipos específicos
const handleError = (error, message = 'Se produjo un error al cargar los productos.') => {
  console.error('Error detallado:', error)
  
  const errorMessage = error.response?.data?.message || error.message || message
  
  return Swal.fire({
    title: 'Error al cargar productos',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Continuar',
    allowOutsideClick: false
  }).then(() => {
    window.location.href = '../index.html'
  })
}

// Función para validar datos del producto
const validateProductData = (data) => {
  const requiredFields = ['nombre', 'precio', 'id', 'imagen']
  return requiredFields.every(field => {
    const isValid = data && data[field]
    if (!isValid) {
      console.warn(`Campo requerido faltante en producto: ${field}`, data)
    }
    return isValid
  })
}

// Función mejorada para mostrar los productos filtrados
const renderProducts = async () => {
  const loadingElement = createLoadingElement()
  div.innerHTML = '' // Limpiar contenido anterior
  div.appendChild(loadingElement)

  try {
    const consolas = await loadProductsFilter()
    div.replaceChildren() // Limpiar incluyendo el loading
    
    if (!consolas || consolas.length === 0) {
      div.innerHTML = `<p class="no-products-message">No hay productos disponibles en la categoría ${CATEGORIA}.</p>`
      return
    }

    const productContainer = document.createElement('div')
    productContainer.className = 'products-grid' // Agregar clase para estilizado

    consolas.forEach(data => {
      if (validateProductData(data)) {
        const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        productContainer.appendChild(newLine)
      }
    })

    div.appendChild(productContainer)
    console.log('Productos renderizados exitosamente')
  } catch (error) {
    handleError(error)
  }
}

// Función mejorada para filtrar productos
const filterProducts = (products, searchTerm) => {
  return products.filter(item => {
    if (!item || !item.nombre) return false
    const normalizedName = item.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
    const normalizedSearch = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
    return normalizedName.includes(normalizedSearch)
  })
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando carga de productos...')
  renderProducts()
})

// Búsqueda mejorada con debounce para mejor rendimiento
let searchTimeout
searchInput.addEventListener('keyup', () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    const searchValue = searchInput.value.trim()
    
    try {
      const category = await loadProductsFilter()
      div.replaceChildren()

      if (searchValue) {
        const filterCategories = filterProducts(category, searchValue)
        
        if (filterCategories.length === 0) {
          await Swal.fire({
            title: 'Producto no encontrado',
            text: 'No se encontraron productos que coincidan con la búsqueda',
            icon: 'warning',
            confirmButtonText: 'Continuar'
          })
          await renderProducts() // Volver a mostrar todos los productos
        } else {
          filterCategories.forEach(data => {
            if (validateProductData(data)) {
              const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
              div.appendChild(line)
            }
          })
        }
      } else {
        await renderProducts()
      }
    } catch (error) {
      handleError(error, 'Error en la búsqueda de productos')
    }
  }, 300) // Debounce de 300ms
})
