const openMenuBtn = document.querySelector('.menu__open');
const closeMenuBtn = document.querySelector('.menu__close');
const navList = document.querySelector('.menu__list');
const openSearchBtn = document.querySelector('.search__btn');
const searchBox = document.querySelector('.header__search__details');

// Función para cambiar la visibilidad de un elemento
const toggleDisplay = (element, display) => {
  if (element) element.style.display = display;
};

// Función para abrir el menú
const openMenu = () => {
  toggleDisplay(navList, 'flex');
  toggleDisplay(openMenuBtn, 'none');
  toggleDisplay(closeMenuBtn, 'inline-block');
  if (window.innerWidth < 768) {
    toggleDisplay(searchBox, 'none');
  }
};

// Función para abrir la caja de búsqueda en pantallas menores a 1024px
const toggleSearch = () => {
  if (searchBox) {
    const currentDisplay = window.getComputedStyle(searchBox).getPropertyValue('display');
    toggleDisplay(searchBox, currentDisplay === 'none' ? 'flex' : 'none');
    toggleDisplay(navList, 'none');
  }
};

// Función para cerrar el menú
const closeMenu = () => {
  toggleDisplay(navList, 'none');
  toggleDisplay(closeMenuBtn, 'none');
  toggleDisplay(openMenuBtn, 'inline-block');
};

// Agregar event listeners
if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
if (openSearchBtn) openSearchBtn.addEventListener('click', toggleSearch);

// Cerrar el menú después de que se haya elegido una sección en pantallas pequeñas
if (window.innerWidth < 1024) {
  document.querySelectorAll('.menu__list, .menu__item').forEach(navItem => {
    navItem.addEventListener('click', closeMenu);
  });
}