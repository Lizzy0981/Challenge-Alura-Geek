import rutaRelativaCabeceraRodapie from "./rutaRelativaCabeceraRodapie.js";

const ruta = rutaRelativaCabeceraRodapie();

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="informaciones container">
        <div class="informaciones__alurageek">
            <div class="informaciones__contactos">
                <div class="informaciones__cabecera">
                    <a class="informaciones__logo" href="${ruta}index.html" title="Ir a la página principal" tabindex="0">
                        <img class="informaciones__logo" src="${ruta}assets/img/iconos/logo-alura-geek.svg"
                            alt="Logo de AluraGeek">
                    </a>
                </div>
                <ul class="informaciones__links">
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ir a quienes somos"
                            tabindex="0">
                            Quienes somos
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Ir a las políticas de provacidad" tabindex="0">
                            Política de privacidad
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Ir al programa de fidelidad" tabindex="0">
                            Programa de fidelidad
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ver nuestras tiendas"
                            tabindex="0">
                            Nuestras tiendas
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Consultar información de franquiciado" tabindex="0">
                            Quiero ser franquiciado
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ir a anuncios"
                            tabindex="0">
                            Anúncie aquí
                        </a>
                    </li>
                </ul>
            </div>
            <form class="formulario" action="" id="formulario-rodapie">
                <legend class="formulario__legend">Hable con nosotros.</legend>
                <p class="formulario__instruccion parrafo">Campos Obligatorios</p>
                <div class="formulario__componentes">
                    <label class="formulario__label" for="nombre" tabindex="0">Nombre:</label>
                    <input class="formulario__campo formulario__campoEstilo" id="nombre" type="text" required
                        placeholder="Nombre(s) Apellido(s)" tabindex="0"
                        title="La primer letra de cada nombre y apellido debe ser en mayúscula, no debe haber más de un espacio en blanco y no puede haber más de 50 carácteres."
                        pattern="^(?=.{3,51}$)([A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:[\\s][A-ZÁÉÍÓÚ][a-záéíóúñ]+)+)$" 
                        minlength="3" maxlength="50" data-campo="nombre">
                    <span class="formulario__span--error" tabindex="0">Error</span>
                </div>
                <div class="formulario__componentes">
                    <label class="formulario__label" for="mensaje" tabindex="0">Mensaje:</label>
                    <textarea class="formulario__textarea formulario__campoEstilo" id="mensaje" required
                        placeholder="Escribe tu mensaje" rows="3" tabindex="0"
                        title="El campo nombre no puede estar en blanco o vacío, debe contener mínimo 20 carácteres máximo 120"
                        minlength="20" maxlength="120" data-campo="mensaje"></textarea>
                    <span class="formulario__span--error" tabindex="0">Error</span>
                </div>
                <input class="formulario__boton boton--secundario" id="btn-enviar" type="submit" value="Enviar Mensaje"
                    tabindex="0">
            </form>
        </div>
        </footer>
        <div class="copyright">
            <p class="copyright__autor parrafo" tabindex="0">Desarrollado por <strong>Elizabeth Diaz Familia</strong></p>
            <div class="social-icons">
                <a href="https://www.linkedin.com/in/eli-familia/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/Lizzy0981" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://twitter.com/Lizzyfamilia" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
            </div>
            <p class="copyright__autor parrafo">&#169; 2024</p>
        </div>
        <style>
            .informaciones {
                background-color: #f0f0f0; /* Color gris claro para el footer */
                padding: 20px 0;
            }
            .copyright {
                background-color: #e0e0e0; /* Un gris un poco más oscuro para la sección de copyright */
                padding: 10px 0;
                text-align: center;
            }
            .social-icons {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 10px;
            }
            .social-icons a {
                color: #000;
                text-decoration: none;
            }
            .social-icons svg {
                width: 24px;
                height: 24px;
                fill: #000; /* Esto asegura que el interior del icono sea negro */
                stroke: #000; /* Esto asegura que el contorno del icono sea negro */
            }
            .copyright__autor {
                color: #333; /* Un color oscuro para el texto para asegurar contraste */
            }
        </style>
        `
    }
}

customElements.define("footer-component", Footer);
