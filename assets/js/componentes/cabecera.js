import rutaRelativaCabeceraRodapie from "./rutaRelativaCabeceraRodapie.js";

const ruta = rutaRelativaCabeceraRodapie();

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header class="cabecera container">
                <nav class="cabecera__menu">
                    <div class="cabecera__logoBuscador">
                        <a class="cabecera__logo" href="${ruta}index.html" title="Ir a la página principal" tabindex="0">
                            <img class="cabecera__logo" src="${ruta}assets/img/iconos/logo-alura-geek.svg" alt="Logo de AluraGeek">
                        </a>
                        <form action="" class="cabecera__formulario" data-formulario-busqueda>
                            <input class="cabecera__campo campo--busqueda" type="text" placeholder="¿Qué deseas buscar?"
                                data-form-buscador>
                        </form>
                    </div>
                    <a class="cabecera__boton boton--primario" href="${ruta}ventanas/login.html" title="Inicia sesión"
                        tabindex="0" data-btn-login>Login</a>
                    <button class="cabecera__botonBuscarMovil" title="Buscar productos" tabindex="0">
                        <img class="cabecera__iconoMovil" src="${ruta}assets/img/iconos/lupa.svg" alt="Icono de Lupa">
                    </button>
                    <button class="cabecera__botonClose cabecera__ocultarElemento" title="Cerrar buscador" tabindex="0">
                        <img class="cabecera__iconoMovil" src="${ruta}assets/img/iconos/close.png" alt="Icono cerrar">
                    </button>
                </nav>
            </header>
            <style>
                body {
                    background-color: #1a1a2e !important; /* Color de fondo oscuro forzado */
                    color: #ffffff !important; /* Color de texto claro forzado */
                }
                .cabecera {
                    background-color: #16213e; /* Color oscuro para el encabezado */
                    padding: 10px 0;
                }
                .cabecera__menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .cabecera__boton {
                    color: #ffffff !important; /* Color claro para el texto del botón */
                    background-color: #0f3460 !important; /* Color de fondo para el botón */
                }
                .cabecera__campo {
                    background-color: #ffffff !important; /* Fondo blanco para el campo de búsqueda */
                    color: #1a1a2e !important; /* Color de texto oscuro para el campo de búsqueda */
                    border: 1px solid #0f3460 !important;
                }
                .formulario {
                    background-color: #e0f7fa !important; /* Color de fondo azul claro para el formulario */
                    padding: 20px !important;
                    border-radius: 8px !important;
                    color: #1a1a2e !important; /* Color de texto oscuro para contrastar con el fondo claro */
                }
            </style>
        `;
        
        // Forzar la aplicación de estilos al body
        document.body.style.setProperty('background-color', '#1a1a2e', 'important');
        document.body.style.setProperty('color', '#ffffff', 'important');
    }
}

customElements.define("header-component", Header);
