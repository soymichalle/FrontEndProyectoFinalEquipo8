// * LOGICA PARA PINTAR CARRITO Y RESUMEN EN CARRITO.HTML

// * Se importan los modulos nefcesarios
import { obtenerCarrito, calcularSubtotal, calcularTotal, eliminarProducto, vaciarCarrito } from "./carrito.js";

// * Función para generarl el carrito con lo que hay en localstorage
function renderizarCarrito() {

    // * Se recupera el carrito
    const carrito = obtenerCarrito();

    // * Se selecciona el contenedor
    const contenedor = document.getElementById("carrito-productos");

    const btnVaciar = document.getElementById("btn-vaciar-carrito");
    
    // * Se limpia el HTML
    contenedor.innerHTML = "";

    // * Se muestra el botón únicamente si hay productos
    btnVaciar.hidden = carrito.length === 0;


    // * Se valida si el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    // * Se recorren los productos
    carrito.forEach(producto => {

        contenedor.innerHTML += `
                        <div class="mb-3">
                            <h5 class="mb-1">${producto.nombre}</h5>
                            <p class="mb-2">${producto.proveedor}</p>
                            <p class="mb-2">Precio: $${producto.precio}</p>
                        <div class="d-flex gap-2 align-items-center">
                            <span>Cantidad:</span>
                            <input type="number" value="${producto.cantidad}" min="1" max="${producto.stock}" data-id="${producto.id}"
                                class="input-cantidad" style="width: 60px;">
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${producto.id}">Eliminar</button>
                        </div>
                    </div>`;

    });


}

// * Función para generar el resumen
function renderizarResumen() {

    // * Se recuperan los elementos del HTML
    const subtotalHTML = document.getElementById("resumen-subtotal");
    const envioHTML = document.getElementById("resumen-envio");
    const totalHTML = document.getElementById("resumen-total");

    // * Se recupera el carrito
    const carrito = obtenerCarrito();

    // * Se calculan los valores
    const subtotales = calcularSubtotal();
    const subtotal = subtotales.reduce((acumulado, valor) => {
        return acumulado + valor;
    }, 0);

    // * Se define el envío
    const envio = carrito.length > 0 ? 10000 : 0;

    // * Se calcula el total
    const total = calcularTotal() + envio;

    // * Se actualiza el HTML
    subtotalHTML.textContent = `$${subtotal.toLocaleString("es-CO")}`;
    envioHTML.textContent = `$${envio.toLocaleString("es-CO")}`;
    totalHTML.textContent = `$${total.toLocaleString("es-CO")}`;

}

// * Se ejecuta al cargar la página
// * Función para actualizar carrito y resumen
function actualizarVista() {
    renderizarCarrito();
    renderizarResumen();
}

// * Evento para eliminar productos
const contenedor = document.getElementById("carrito-productos");

contenedor.addEventListener("click", async  (event) => {

    // * Se identifica el botón eliminar
    const boton = event.target.closest(".btn-eliminar");

    if (!boton) return;

    // * Se captura el ID del producto
    const idProducto = boton.dataset.id;

    // * Se elimina el producto
    const eliminado = await eliminarProducto(idProducto);

    // * Se actualiza la vista si se confirmó
    if (eliminado) {
        actualizarVista();
    }

});

// * Evento para vaciar el carrito
const btnVaciar = document.getElementById("btn-vaciar-carrito");

btnVaciar.addEventListener("click", async () => {

    // * Se vacía el carrito
    const vaciado = await vaciarCarrito();

    // * Se actualiza la vista si se confirmó
    if (vaciado) {
        actualizarVista();
    }

});

// * Se ejecutan las funciones al cargar la página
actualizarVista();