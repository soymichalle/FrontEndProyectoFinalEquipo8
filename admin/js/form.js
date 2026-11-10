import { mostrarProductos } from "./listaProductos.js";

// Se definen elementos del DOM
const formulario = document.getElementById("form-producto");
const formularioProducto = document.getElementById("formulario-producto");

const btnAgregarProducto = document.getElementById("btn-agregar-producto");

const inputImagen = document.getElementById("imagen-producto");
const imgPrevia = document.getElementById("vista-previa");

const inputId = document.getElementById("id-producto");

// Se genera ID
function generarId() {

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        return 1;
    }

    const ids = productos.map(producto => Number(producto.id));

    return Math.max(...ids) + 1;
}

// Se muestra y se oculta el form
btnAgregarProducto.addEventListener("click", () => {

    formularioProducto.classList.toggle("d-none");

    // Se genera el ID cuando se abre el formulario
    if (!formularioProducto.classList.contains("d-none")) {
        inputId.value = generarId();
    }

});

// Se define vista previa de img
inputImagen.addEventListener("change", () => {

    const archivo = inputImagen.files[0];

    if (archivo) {

        imgPrevia.src = URL.createObjectURL(archivo);

        imgPrevia.classList.remove("d-none");

    }

});

// Se guardan productos
formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    // Se recuperan los productos existentes
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Se capturan los valores del formulario
    const nuevoProducto = {

        id: Number(inputId.value),

        nombre: document.getElementById("nombre-producto").value,

        proveedor: document.getElementById("nombre-proveedor").value,

        categoria: document.getElementById("categoria-producto").value,

        precio: Number(document.getElementById("precio-producto").value),

        stock: Number(document.getElementById("stock-producto").value),

        imagen: ""

    };

    // Se convierten la imagen a Base64 para almacenarla
    const archivo = inputImagen.files[0];

    if (archivo) {

        const lector = new FileReader();

        lector.onload = () => {

            nuevoProducto.imagen = lector.result;

            guardarProducto(nuevoProducto, productos);

        };

        lector.readAsDataURL(archivo);

    } else {

        guardarProducto(nuevoProducto, productos);

    }

});

// Se almacena en localstorage
function guardarProducto(nuevoProducto, productos) {

    // Se agregan el nuevo producto al array
    productos.push(nuevoProducto);

    // Se actualiza localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("¡Producto guardado exitosamente!");

    // Se actualiza la tabla administrativa
    mostrarProductos();

    // Se limpia el formulario
    formulario.reset();

    // Se oculta la vista previa
    imgPrevia.src = "";
    imgPrevia.classList.add("d-none");

    // Se prepara el siguiente ID
    inputId.value = generarId();

}