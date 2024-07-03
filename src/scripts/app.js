import { documentos, persona } from "./documentos.js";

// Capturar a todos por id
const name = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const numeroDoc = document.querySelector("#numeroDoc");
const correo = document.querySelector("#correo");
const direccion = document.querySelector("#direccion");
const select = document.querySelector("#select");
const formulario = document.querySelector("#formulario");
const mostrarUser = document.querySelector("#mostrarUsers");
const fragmentoSelect = document.createDocumentFragment();

const regex = /@/;

// Se hace el recorrido para poder extraer la cantidad de documentos que existen
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
  })


// Funcion para validar que no se puedan escribir ciertos caracteres
function validar(){
  name.setAttribute("onkeypress", "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32 || event.charCode === 8 || event.charCode === 9 || event.charCode === 13)");
  apellido.setAttribute("onkeypress", "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode === 32 || event.charCode === 8 || event.charCode === 9 || event.charCode === 13)");
  correo.setAttribute("onkeypress", "return ((event.charCode >= 0 && event.charCode <= 255))");
  direccion.setAttribute("onkeypress" , "return ((event.charCode >= 0 && event.charCode <= 255))");
  numeroDoc.setAttribute("onkeypress", "return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode === 8 || event.charCode === 9 || event.charCode === 13 )");
}



// Funcion para enviar el formulario y se le pasa el preventDefault para que no se refresque la pagina
function enviar(event){
  event.preventDefault();
  if (name.value.trim() === "") {
    name.classList.add("border-solid", "border-red-500", "border-4", "focus:outline-red-500" );
  }
  else{
    name.classList.add("border-solid", "border-green-500", "border-4", "focus:outline-green-500");
    name.classList.remove("border-solid", "border-red-500", "focus:outline-red-500");
  }
  
  if (apellido.value.trim() === "") {
    apellido.classList.add("border-solid", "border-red-500", "border-4", "focus:outline-red-500" );
  }
  else{
    apellido.classList.add("border-solid", "border-green-500", "border-4", "focus:outline-green-500");
    apellido.classList.remove("border-solid", "border-red-500", "focus:outline-red-500");
  }

  if (direccion.value.trim() === "") {
    direccion.classList.add("border-solid", "border-red-500", "border-4", "focus:outline-red-500" );
  }
  else{
    direccion.classList.add("border-solid", "border-green-500", "border-4", "focus:outline-green-500");
    direccion.classList.remove("border-solid", "border-red-500", "focus:outline-red-500");
  }

  if (numeroDoc.value.trim() === "") {
    numeroDoc.classList.add("border-solid", "border-red-500", "border-4", "focus:outline-red-500" );
  }
  else{
    numeroDoc.classList.add("border-solid", "border-green-500", "border-4", "focus:outline-green-500");
    numeroDoc.classList.remove("border-solid", "border-red-500", "focus:outline-red-500");
  }


  if (regex.test(correo.value)) {

    correo.classList.add("border-solid", "border-green-500", "border-4", "focus:outline-green-500");
    // Objeto a enviar a la simulacion de la base de datos
    const send = {
      id: 5,
      nombre: name.value,
      apellido: apellido.value,
      documento: parseInt(numeroDoc.value),
      tipo_documento: select.value,
      correo: correo.value,
      direccion: direccion.value
    }
  
    // Opciones para poder manejar el metodo a utilizar
    const opciones = {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(send)
    }
  
    // Peticion al servidor 
    fetch("http://localhost:3000/users", opciones)
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
      })
  
      // luego de enviado el formulario se setea todo a vacio de una vez
      name.value = "";
      apellido.value = "";
      numeroDoc.value = "";
      correo.value = "";
      direccion.value = "";
      select.value = "";
  }
  else{
    console.log("El correo no tiene arroba");
  }
}

// Eventos para el 
name.addEventListener("keydown", validar);
apellido.addEventListener("keydown", validar);
numeroDoc.addEventListener("keydown", validar);
correo.addEventListener("keydown", validar);
direccion.addEventListener("keydown", validar);
formulario.addEventListener("submit", enviar);

const tabla = document.querySelector("#listar");
const containerTable = document.querySelector("#containerTable");
const fragementoTable = document.createDocumentFragment();
console.log(tabla);

function mostrar() {
  containerTable.classList.toggle("hidden");
}

persona()
.then((user) => {
  user.forEach((u) => {
    console.log(u);
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td.textContent = u.id;
    td1.textContent = u.nombre;
    td2.textContent = u.apellido;
    td3.textContent = u.documento;
    td4.textContent = u.tipo_documento;
    td5.textContent = u.correo;
    td6.textContent = u.direccion;
    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    fragementoTable.appendChild(tr);
  })
  tabla.appendChild(fragementoTable)
})

mostrarUser.addEventListener("click", mostrar);

