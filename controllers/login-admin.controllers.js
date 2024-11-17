import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

// Verificar que el formulario se encuentra
console.log('Formulario encontrado:', formLogin)

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  // Obtener y verificar valores de los inputs
  const emailInput = document.querySelector('[data-tipo="email"]')
  const passwordInput = document.querySelector('[data-tipo="password"]')
  
  console.log('Input email encontrado:', emailInput)
  console.log('Input password encontrado:', passwordInput)
  
  const email = emailInput.value
  const password = passwordInput.value
  
  console.log('Valores a enviar:', { email, password })

  try {
    // Verificar conexión al API
    const apiHealth = await adminService.checkApiHealth()
    console.log('API Health:', apiHealth)

    // Obtener lista de admins
    const admins = await adminService.adminList()
    console.log('Admins obtenidos:', admins)
    
    // Buscar coincidencia
    const adminValid = admins.some(admin => {
      console.log('Comparando con:', admin.email)
      return admin.email === email && admin.password === password
    })

    if (adminValid) {
      console.log('Login exitoso')
      window.location.href = './lista-productos-admin.html'
    } else {
      console.log('Credenciales incorrectas')
      throw new Error('Credenciales inválidas')
    }
  } catch (error) {
    console.error('Error detallado:', error)
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
