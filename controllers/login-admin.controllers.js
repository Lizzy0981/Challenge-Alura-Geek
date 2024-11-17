import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Obtener valores de los inputs
  const email = document.querySelector('[data-tipo="email"]').value
  const password = document.querySelector('[data-tipo="password"]').value

  try {
    // Intentar login
    const response = await adminService.login(email, password)

    if (response.success) {
      // Guardar token si el backend lo provee
      if (response.token) {
        localStorage.setItem('adminToken', response.token)
      }

      console.log('Login exitoso')
      window.location.href = './lista-productos-admin.html'
    } else {
      throw new Error('Credenciales inválidas')
    }
  } catch (error) {
    console.error('Error en el login:', error)
    Swal.fire({
      title: 'Error de acceso',
      text: error.message === 'Credenciales inválidas'
        ? 'Email o contraseña incorrectos. Por favor, verifique sus credenciales.'
        : 'Ocurrió un error al intentar iniciar sesión. Por favor, intente más tarde.',
      icon: 'error',
      confirmButtonText: 'Intentar nuevamente'
    })
  }
})
