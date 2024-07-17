import { documentos, persona, eliminarUser, crearSpans } from "./modulo.js";

// TODO --- Capturar a todos por id de los input, capturar el formulario, y crear un fragmento para el select del tipo de documento
const identificador = document.querySelector("#identificador");
const name = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const numeroDoc = document.querySelector("#numeroDoc");
const correo = document.querySelector("#correo");
const direccion = document.querySelector("#direccion");
const select = document.querySelector("#select");
const telefono = document.querySelector("#telefono");
const formulario = document.querySelector("#formulario");
const btnForm = document.querySelector("#btnForm");
const check = document.querySelector("#check");
const mostrarUser = document.querySelector("#mostrarUsers");
const fragmentoSelect = document.createDocumentFragment();
// -------------------------------------------------------------

// TODO --- Capturar la tabla para agregarle los usuarios que tiene el JSON
const tabla = document.querySelector("#listar");
const containerTable = document.querySelector("#containerTable");
const fragementoTable = document.createDocumentFragment();
// -------------------------------------------------------------

// Expresion regular para validar que el correo contenga arrobas y tenga el .com
const regex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com\b$/;

// TODO --- Se hace el recorrido para poder extraer la cantidad de documentos que existen
documentos()
  .then((lista) => {
    lista.forEach((e) => {
      let option = document.createElement("option");
      option.textContent = e.tipo_documento;
      fragmentoSelect.appendChild(option);
    })
    select.appendChild(fragmentoSelect)
  })
  .catch((error) => {
    console.log(error);
  });
// -------------------------------------------------------

// Funcion para saber si el checkbox esta checkeado o no
let checkeado = () => {
  if (check.checked) {
    btnForm.removeAttribute("disabled");
    console.log("Esta validado");
  } else {
    btnForm.setAttribute("disabled", "");
    console.log("no esta chekead");
  }
}

// Funcion para enviar el formulario y se le pasa el preventDefault para que no se refresque la pagina
let enviar =  async (event) => {

  // Variable para controlar si el formulario es valido
  let formValido = true;

  // Validacion del nombre si no esta vacio
  if (name.value.trim() === '') {
    name.classList.remove("border-green-500");
    name.classList.add("border-red-500", "border-2");
    name.insertAdjacentElement("afterend", crearSpans("El nombre es obligatorio"));
    formValido = false
  }
  else {
    name.classList.remove("border-red-500");
    name.classList.add("border-green-500", "border-2");
  }

  // Validacion del apellido si no esta vacio
  if (apellido.value.trim() === '') {
    console.log("El Apellido es obligatorio");
    apellido.classList.remove("border-green-500");
    apellido.classList.add("border-red-500", "border-2");
    apellido.insertAdjacentElement("afterend", crearSpans("El apellido es obligatorio"));
    formValido = false;
  }
  else{
    apellido.classList.add("border-green-500", "border-2");
    apellido.classList.remove("border-red-500");
  }

  // Validacion del correo si no esta vacio
  if (correo.value.trim() === '') {
    console.log("El correo es obligatorio");
    correo.classList.remove("border-green-500");
    correo.classList.add("border-red-500", "border-2");
    correo.insertAdjacentElement("afterend", crearSpans("El correo es obligatorio"));
    formValido = false;
  }
  else{
    if (!regex.test(correo.value)) {
      console.log("El correo debe llevar una arroba");
      correo.classList.remove("border-green-500");
      correo.insertAdjacentElement("afterend", crearSpans("El correo debe contener @ y .com"));
      formValido = false;
    }
    else{
      correo.classList.remove("border-red-500");
      correo.classList.add("border-green-500", "border-2");
    }
  }

  // Validacion del numero de documento si no esta vacio
  if (numeroDoc.value.trim() === '') {
    console.log("El numero de documento es obligatorio");
    numeroDoc.classList.remove("border-green-500");
    numeroDoc.classList.add("border-red-500", "border-2");
    numeroDoc.insertAdjacentElement("afterend", crearSpans("El numero de documento es obligatorio"));
    formValido = false;
  }
  else{
    if (/[0-9]{6,10}/.test(numeroDoc.value)) {
      numeroDoc.classList.remove("border-red-500");
      numeroDoc.classList.add("border-green-500", "border-2");
    }
    else {
      console.log("El numero de documento debe que tener minimo 6 caraxteres");
      numeroDoc.classList.remove("border-green-500");
      numeroDoc.classList.add("border-red-500", "border-2");
      numeroDoc.insertAdjacentElement("afterend", crearSpans("debe tener minimo 6 caracteres y maximo 10"));
      formValido = false;
    }
  }

  // Validacion de la direccion si no esta vacio
  if (direccion.value.trim() === '') {
    console.log("La direccion es obligatoria");
    direccion.classList.remove("border-green-500");
    direccion.classList.add("border-red-500", "border-2");
    direccion.insertAdjacentElement("afterend", crearSpans("la direccion es obligatoria"));
    formValido = false;
  }
  else{
    direccion.classList.remove("border-red-500");
    direccion.classList.add("border-green-500", "border-2");
  }

  // Validacion del select que no sea un tipo de documento por defecto
  if (select.value.replace(/\s+/g, '').toLowerCase() === "seleccionesutipodedocumento") {
    console.log("Seleccione su tipo de documento es obligatorio");
    select.classList.remove("border-green-500");
    select.classList.add("border-red-500", "border-2");
    select.insertAdjacentElement("afterend", crearSpans("El tipo de documento es obligatorio"));
    formValido = false;
  }
  else{
    select.classList.remove("border-red-500");
    select.classList.add("border-green-500", "border-2");
  }

  if (telefono.value.trim() === '') {
    console.log("Ingrese su numero telefonico");
    telefono.classList.remove("border-greeb-500", "border-2");
    telefono.classList.add("border-red-500", "border-2");
    telefono.insertAdjacentElement("afterend", crearSpans("El numero de telefono es obligatorio"));
    formValido = false;
  }
  else {
    if (/[0-9]{10}/.test(telefono.value)) {
      telefono.classList.remove("border-red-500", "border-2");
      telefono.classList.add("border-green-500", "border-2");
    }
    else {
      console.log("Se deben ingresar 10 numeros al telefono");
      telefono.classList.remove("border-greeb-500", "border-2");
      telefono.classList.add("border-red-500", "border-2");
      telefono.insertAdjacentElement("afterend", crearSpans("El telefono debe tener 10 digitos"));
      formValido = false;
    }
  }
  // Verificacion si todos los campos tienen valor
  if (!formValido) {
    console.error("No se mando el formulario");
    event.preventDefault();
  }
  else{
    // event.preventDefault();
    console.log("Se mando el formulario");

    // Remover todas las clases para nuevo envio
    name.classList.remove("border-green-500", "border-2");
    apellido.classList.remove("border-green-500", "border-2");
    direccion.classList.remove("border-green-500", "border-2");
    numeroDoc.classList.remove("border-green-500", "border-2");
    select.classList.remove("border-green-500", "border-2");
    correo.classList.remove("border-green-500", "border-2");

    // Enviar el usuario que se esta seteando
    
    if (identificador.value.trim() === '') {
      const send = {
        id: Math.floor(Math.random() * 100).toString(),
        nombre: name.value,
        apellido: apellido.value,
        documento: parseInt(numeroDoc.value),
        tipo_documento: select.value,
        correo: correo.value,
        direccion: direccion.value,
        telefono: telefono.value
      }
      // --------------------------------------
      
      // Opciones para poder manejar el metodo a utilizar
      const opciones = {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(send)
      }
      // -------------------------------------------------
  
      // TODO --- Peticion al servidor y realizar metodo post del nuevo usuario 
      await fetch("http://localhost:3000/users", opciones)
        .then((r) => {
          if(!r.ok){ 
            throw Error(r.status);
          }
          return r.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e)
        });
      // --------------------------------------------------
  
      // luego de enviado el formulario se setea todo a vacio de una vez
      name.value = "";
      apellido.value = "";
      numeroDoc.value = "";
      correo.value = "";
      direccion.value = "";
      select.value = "";
      telefono.value = "";
    }
    else{
      modificar();
    }
  }
}
// ------------------------------------------------------------------------------


// TODO --- Funcion para mostrar la tabla con los usuarios del JSON
function mostrar() {
  containerTable.classList.toggle("hidden");
}
// -----------------------------------------------------------


function modificar(event){

  let data = {
      id: identificador.value,
      nombre: name.value,
      apellido: apellido.value,
      documento: parseInt(numeroDoc.value),
      tipo_documento: select.value,
      correo: correo.value,
      direccion: direccion.value,
      telefono: telefono.value
  }

  fetch(`http://localhost:3000/users/${identificador.value}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'aplication/json; charset=UTF-8'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((i) => {
      console.log(i)
    })
}

function modificarUser(id){
  console.log(id)
  fetch(`http://localhost:3000/users/${id}`)
    .then((u) => {
      return u.json();
    })
    .then((user) => {
      name.value = user.nombre;
      apellido.value = user.apellido;
      numeroDoc.value = user.documento;
      correo.value = user.correo;
      direccion.value = user.direccion;
      select.value = user.tipo_documento;
      telefono.value = user.telefono;
      identificador.value = id;
      btnForm.innerText = "Modificar usuario";
    })
}


// TODO --- Metodo para listar los usuarios en la tabla
persona()
.then((user) => {
  user.forEach((u) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let btn = document.createElement("button");
    let btnModify = document.createElement("button");
    td.textContent = u.id;
    td1.textContent = u.nombre;
    td2.textContent = u.apellido;
    td3.textContent = u.documento;
    td4.textContent = u.tipo_documento;
    td5.textContent = u.correo;
    td6.textContent = u.direccion;
    td8.textContent = u.telefono;

    btnModify.textContent = "Modificar";
    btnModify.classList.add("btnModificar");
    btnModify.setAttribute("data-id", u.id);

    btn.innerText = "Eliminar";
    btn.setAttribute("type", "submit");
    btn.classList.add("btnEliminar");

    btn.setAttribute("data-id", u.id);

    td7.appendChild(btn);
    td7.appendChild(btnModify);
    td7.classList.add("flex", "gap-2", "h-full", "flex-col");

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td8);
    tr.appendChild(td7);
    fragementoTable.appendChild(tr);
  })
  tabla.appendChild(fragementoTable);
  addEventBtn();
  addEventModify();
});
// ----------------------------------------------

function addEventBtn() {
  let x = document.querySelectorAll(".btnEliminar");
  x.forEach(button => {
    let ident = button.getAttribute("data-id");
    button.addEventListener("click", ()=> eliminarUser(ident));
  })
}

function addEventModify(){
  let y = document.querySelectorAll(".btnModificar");
  y.forEach((e) => {
      let identi = e.getAttribute("data-id");
      e.addEventListener("click",() => modificarUser(identi))
    })
  }

// TODO --- Eventos para manejar el DOM
formulario.addEventListener("submit", enviar); // Evento para validar el formulario
mostrarUser.addEventListener("click", mostrar); // Evento click para el boton para que muestre la tabla de usuarios
check.addEventListener("click", checkeado);

name.addEventListener("blur", (event) => {
  console.log(event)
  if (!/[A-Za-zàáâãéêíóôõúüñÑ\s]/.test(event)) {
      event.preventDefault();
  }
})