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
                    background-color: #1a1a2e; /* Color de fondo oscuro para toda la página */
                    color: #ffffff; /* Color de texto claro para contrastar con el fondo oscuro */
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
                    color: #ffffff; /* Color claro para el texto del botón */
                    background-color: #0f3460; /* Color de fondo para el botón */
                }
                .cabecera__campo {
                    background-color: #ffffff; /* Fondo blanco para el campo de búsqueda */
                    color: #1a1a2e; /* Color de texto oscuro para el campo de búsqueda */
                    border: 1px solid #0f3460;
                }
                .cabecera__botonBuscarMovil, .cabecera__botonClose {
                    background-color: transparent;
                    border: none;
                }
                .informaciones {
                    background-color: #16213e; /* Color oscuro para el footer, igual que el encabezado */
                }
                .copyright {
                    background-color: #0f3460; /* Color más oscuro para la sección de copyright */
                }
                .social-icons svg {
                    fill: #ffffff; /* Color claro para los iconos de redes sociales */
                    stroke: #ffffff;
                }
                /* Estilos para el formulario con fondo azul claro */
                .formulario {
                    background-color: #e0f7fa; /* Color de fondo azul claro para el formulario */
                    padding: 20px;
                    border-radius: 8px;
                    color: #1a1a2e; /* Color de texto oscuro para contrastar con el fondo claro */
                }
                .formulario__legend {
                    color: #16213e; /* Color oscuro para el título del formulario */
                    font-weight: bold;
                }
                .formulario__label {
                    color: #16213e; /* Color oscuro para las etiquetas del formulario */
                }
                .formulario__campo, .formulario__textarea {
                    background-color: #ffffff;
                    border: 1px solid #0f3460;
                    color: #1a1a2e;
                }
                .formulario__boton {
                    background-color: #0f3460;
                    color: #ffffff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .formulario__boton:hover {
                    background-color: #16213e;
                }
            </style>
        `;
    }
}

customElements.define("header-component", Header);
