import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  // Obtener valores de los inputs
  const email = document.querySelector('[data-tipo="email"]').value
  const password = document.querySelector('[data-tipo="password"]').value

  console.log('Intentando login con:', { email, password }) // Para debugging

  try {
    const admins = await adminService.adminList()
    console.log('Lista de admins obtenida:', admins) // Para debugging
    
    // Buscar coincidencia de credenciales
    const adminValid = admins.some(admin => 
      admin.email === email && admin.password === password
    )

    if (adminValid) {
      // Login exitoso
      console.log('Login exitoso')
      window.location.href = './lista-productos-admin.html'
    } else {
      // Credenciales inválidas
      console.log('Credenciales incorrectas')
      Swal.fire({
        title: 'Error de acceso',
        text: 'Email o contraseña incorrectos. Por favor, verifique sus credenciales.',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente'
      })
    }
  } catch (error) {
    console.error('Error en el login:', error)
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al intentar iniciar sesión. Por favor, intente más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
})
