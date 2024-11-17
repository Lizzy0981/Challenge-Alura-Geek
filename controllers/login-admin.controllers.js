import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('[data-tipo="email"]').value
  const password = document.querySelector('[data-tipo="password"]').value

  // Validación básica de campos
  if (!email || !password) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor complete todos los campos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return
  }

  try {
    // Verificar conexión al API
    const isApiAvailable = await adminService.checkApiHealth()
    if (!isApiAvailable) {
      throw new Error('API no disponible')
    }

    // Intentar login
    const loginResponse = await adminService.login(email, password)

    if (loginResponse.success) {
      // Si el backend envía un token, lo guardamos
      if (loginResponse.token) {
        localStorage.setItem('adminToken', loginResponse.token)
      }

      // Guardar información de la sesión
      sessionStorage.setItem('adminData', JSON.stringify({
        email: email,
        isLoggedIn: true
      }))

      // Redireccionar a la página de productos
      window.location.href = './lista-productos-admin.html'
    } else {
      throw new Error('credenciales_invalidas')
    }

  } catch (error) {
    console.error('Error en login:', error)
    
    let mensaje = 'Ocurrió un error al intentar iniciar sesión. Por favor, intente más tarde.'
    
    if (error.message === 'credenciales_invalidas') {
      mensaje = 'Email o contraseña incorrectos. Por favor, verifique sus credenciales.'
    } else if (error.message === 'API no disponible') {
      mensaje = 'No se puede conectar con el servidor. Por favor, intente más tarde.'
    }

    Swal.fire({
      title: 'Error de acceso',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
})
