// URL de la API de productos
const API_URL = "https://fakestoreapi.com/products";

// elementos del dom donde se mostrara la información
const contenedor = document.getElementById("productos");
const estado = document.querySelector("#estado");

// funcion asíncrona que obtiene los productos con fetch()
async function cargarProductos() {
  try {
    // hacemos la peticion a la API
    const respuesta = await fetch(API_URL);

    // validar que el servidor respondio correctamente
    if (!respuesta.ok) {
      throw new Error("El servidor respondió con el código " + respuesta.status);
    }

    // convertir la respuesta a JSON
    const productos = await respuesta.json();

    // validar que realmente llegó una lista con datos
    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error("La API no devolvió productos");
    }

    // mostrar los productos y limpiar el mensaje de carga
    mostrarProductos(productos);
    estado.textContent = "";
  } catch (error) {
    // Si algo falla (sin internet, API caída, datos inválidos), se avisa al usuario
    console.error("Error al cargar productos:", error);
    estado.textContent = "No se pudo abrir el almacén: " + error.message + ". Intenta de nuevo más tarde.";
    estado.classList.add("error");
  }
}

// crea una tarjeta por cada producto 
function mostrarProductos(productos) {
  productos.forEach(function (producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";

    const foto = document.createElement("div");
    foto.className = "foto";
    const imagen = document.createElement("img");
    imagen.src = producto.image;
    imagen.alt = producto.title;
    imagen.loading = "lazy";
    foto.appendChild(imagen);

    const categoria = document.createElement("p");
    categoria.className = "categoria";
    categoria.textContent = producto.category;

    const nombre = document.createElement("h2");
    nombre.className = "nombre";
    nombre.textContent = producto.title;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = "$" + Number(producto.price).toFixed(2);

    tarjeta.append(foto, categoria, nombre, precio);
    contenedor.appendChild(tarjeta);
  });
}

// ejecutar al abrir la página
cargarProductos();