const validadores = {
  mensaje: (textarea) => validarTextareaContacto(textarea),
  descripcion: (textarea) => validarTextareaDescripcion(textarea)
};

const tipoErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
];

const mensajeError = {
  nombre: {
    valueMissing: 'El campo Nombre no puede estar vacío',
    patternMismatch: 'No debe superar los 50 caracteres'
  },
  email: {
    valueMissing: 'El campo email no puede estar vacío',
    typeMismatch: 'El correo no es válido'
  },
  password: {
    valueMissing: 'El campo contraseña no puede estar vacío'
  },
  mensaje: {
    valueMissing: 'El campo Mensaje no puede estar vacío',
    customError: 'No debe superar los 120 caracteres'
  },
  nombreProducto: {
    valueMissing: 'El campo Nombre del producto no puede estar vacío',
    patternMismatch: 'No debe superar los 20 caracteres'
  },
  precio: {
    valueMissing: 'El campo Precio no puede estar vacío',
    typeMismatch: 'El campo Precio solo acepta números'
  },
  categoria: {
    valueMissing: 'El campo Categoría no puede estar vacío. Las opciones y forma de escribir: diversos, consolas, star-wars, laptos'
  },
  descripcion: {
    valueMissing: 'El campo Descripcion no puede estar vacío',
    customError: 'No debe superar los 150 caracteres'
  }
};

export function validaInput(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
  actualizarEstadoValidacion(input, '.input-container--invalid', '.input-message-error');
}

export function validaText(textarea) {
  const tipoInput = textarea.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](textarea);
  }
  actualizarEstadoValidacion(textarea, '.textarea-container--invalid', '.textarea-message-error');
}

function actualizarEstadoValidacion(elemento, claseInvalida, selectorMensajeError) {
  const contenedor = elemento.parentElement;
  const mensajeError = contenedor.querySelector(selectorMensajeError);
  
  if (elemento.validity.valid) {
    contenedor.classList.remove(claseInvalida);
    mensajeError.textContent = '';
  } else {
    contenedor.classList.add(claseInvalida);
    mensajeError.textContent = mostrarError(elemento.dataset.tipo, elemento);
  }
}

function mostrarError(tipoInput, input) {
  for (const error of tipoErrores) {
    if (input.validity[error]) {
      return mensajeError[tipoInput][error] || 'Error no especificado';
    }
  }
  return '';
}

function validarTextareaContacto(textarea) {
  validarLongitudTextarea(textarea, 120);
}

function validarTextareaDescripcion(textarea) {
  validarLongitudTextarea(textarea, 150);
}

function validarLongitudTextarea(textarea, maxLength) {
  const textLength = textarea.value.length;
  textarea.setCustomValidity(textLength > maxLength ? `No debe superar los ${maxLength} caracteres` : '');
}