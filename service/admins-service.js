// Obtener todos los administradores
const adminList = () => fetch('https://alurageek-api-alura.onrender.com/admins').then(res => res.json())

export const adminService = {
  adminList
}