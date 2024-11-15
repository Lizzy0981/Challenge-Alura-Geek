import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  try {
    console.log('Intentando login con:', email) // Para debugging
    const admins = await adminService.adminList()
    let adminFound = false

    admins.forEach(admin => {
      console.log('Comparando con admin:', admin.email) // Para debugging
      if (admin.email === email && admin.password === password) {
        adminFound = true
      }
    })

    if (adminFound) {
      console.log('Login exitoso') // Para debugging
      window.location.href = './lista-productos-admin.html'
    } else {
      console.log('Credenciales incorrectas') // Para debugging
      Swal.fire({
        title: 'Error de acceso',
        text: 'Email o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente'
      })
    }
  } catch (error) {
    console.error('Error durante el login:', error)
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error al intentar iniciar sesión. Por favor, intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
})
