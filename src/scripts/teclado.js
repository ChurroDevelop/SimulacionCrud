// Atrapando los  campos del input 
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const numDocumento = document.querySelector("#numeroDoc");
const correo = document.querySelector("#correo");
const direccion = document.querySelector("#direccion");
const telefono = document.querySelector("#telefono");

// Validaciones para los input tipo text
let inputText = (event) => {
    console.log(event)
    if (!/[A-Za-zàáâãéêíóôõúüñÑ\s]/.test(event.key)) {
        event.preventDefault();
    }
}

// Validaciones para los input tipo number
let inputNumber = (event) => {
    if (!/[0-9]/.test(event.key) || telefono.value.length === 10 || numDocumento.value.length >= 10) {
        event.preventDefault();
    }
}

// Agregando los eventos para las validaciones
nombre.addEventListener("keypress", inputText);
apellido.addEventListener("keypress", inputText);
numDocumento.addEventListener("keypress", inputNumber);
telefono.addEventListener("keypress", inputNumber);
nombre.addEventListener("keypress", inputText);