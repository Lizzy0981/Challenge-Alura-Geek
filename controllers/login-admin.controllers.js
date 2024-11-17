import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('form')
if (!formLogin) {
  console.error('No se encontró el formulario de login')
}

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('[type="email"]').value
  const password = document.querySelector('[type="password"]').value

  // Validación básica
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
    // Verificar conexión
    const isApiAvailable = await adminService.checkApiHealth()
    if (!isApiAvailable) {
      throw new Error('API no disponible')
    }

    // Obtener lista de admins y verificar credenciales
    const admins = await adminService.adminList()
    console.log('Verificando credenciales...')
    
    const adminValid = admins.some(admin => 
      admin.email.toLowerCase() === email.toLowerCase() && 
      admin.password === password
    )

    if (adminValid) {
      // Guardar sesión
      sessionStorage.setItem('adminData', JSON.stringify({
        email: email,
        isLoggedIn: true
      }))
      
      console.log('Login exitoso')
      window.location.href = './lista-productos-admin.html'
    } else {
      throw new Error('credenciales_invalidas')
    }

  } catch (error) {
    console.error('Error en login:', error.message)
    
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
