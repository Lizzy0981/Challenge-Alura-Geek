import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('[data-tipo="email"]').value
  const password = document.querySelector('[data-tipo="password"]').value

  try {
    const admins = await adminService.adminList()
    // Variable para verificar si encontramos un admin válido
    let adminEncontrado = false;

    // Verificar cada admin
    for (const admin of admins) {
      if (admin.email === email && admin.password === password) {
        adminEncontrado = true;
        window.location.href = '../screens/lista-productos-admin.html';
        break; // Salir del loop si encontramos un match
      }
    }

    // Si no encontramos un admin válido
    if (!adminEncontrado) {
      Swal.fire({
        title: 'No es administrador',
        text: 'Debe usar el formulario de Contacto para comunicarse con el administrador de la página',
        icon: 'error',
        confirmButtonText: 'Continuar'
      }).then(() => {
        window.location.href = '../screens/login.html'
      });
    }

  } catch (error) {
    console.error('Error al verificar credenciales:', error);
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error al verificar las credenciales. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    });
  }
});
