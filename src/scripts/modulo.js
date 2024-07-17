// Funcion para agregar los documentos al formulario
export const documentos = async () => {
  let request = await fetch("http://127.0.0.1:3000/docs");
  let response = await request.json();
  return response
}

// Funcion para poder visualizar las personas
export const persona = async () => {
  let request = await fetch("http://127.0.0.1:3000/users");
  let response = await request.json();
  return response;
}

// Funcion para eliminar el usuario
export const eliminarUser = (id) => {
  fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
}

export const crearSpans = (mensaje) => {
  let span = document.createElement("span");
  span.innerText = mensaje;
  span.classList.add("text-xs", "text-red-500");
  return span;
}