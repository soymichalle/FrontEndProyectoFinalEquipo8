// * LOGICA DEL LOCALSTORAGE DESDE AQUÍ

//* Se importan los modulos necesarios
import { notificarExito, notificarError, confirmarAccion } from "../../js/alertas.js";

// * Se define la clave para identificar el carrito en localStorage
const CLAVE_CARRITO = "boronvino_carrito";

// * Función para recuperar los productos almacenados
export function obtenerCarrito() {

    // * Recuperamos los datos del carrito del localStorage
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    // * Return
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];

}

// * Función para guardar el arreglo en localStorage
export function guardarCarrito(productos) {

    // * Se guarda el carrito en localStorage
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));

}

// *  Función para agregar/auemntar cantidad de producto
export function agregarProducto(productoNuevo) {

    // * Recuperar carrito
    const carrito = obtenerCarrito();

    // * Se busca el producto dentro del carrito
    const productoExistente = carrito.find(
        producto => String(producto.id) === String(productoNuevo.id)
    );

    // * Se valida si se encontró el producto en carrito
    if (productoExistente) {

        // * Se actualiza el stock con el dato del catálogo
        productoExistente.stock = Number(productoNuevo.stock);

        // * Si existe aumenta cantidad
        const actualizado = aumentarCantidad(productoExistente);

        // * Se valida unidades disponibles
        if (!actualizado) {
            notificarError("No hay más unidades disponibles.");
            return false;
        }

    } else {

        // * Se valida que haya Stock del producto
        if (Number(productoNuevo.stock) < 1) {
            notificarError("Producto agotado.");
            return false;
        }

        // * Si no, crea un nuevo elemento en carrito
        carrito.push({ ...productoNuevo, cantidad: 1 });
    }

    // * Se actualiza carrito
    guardarCarrito(carrito);

    // * Se notifica al usuario
    notificarExito("Producto añadido al carrito.");

    return true;
}

// ! Funcion para Johan, pdte actualizar localstorage
// * Función para aumentar unidades
export function aumentarCantidad(producto) {

    // * Se valida que no supere el stock disponible
    if (producto.cantidad < producto.stock) {

        // * Se aumenta cantidad :D
        producto.cantidad++;

        // * Return
        return true;
    }

    // * Return
    return false;

}

// ! Funcion para Johan, pdte actualizar localstorage
// * Función para disminuir unidades
export function disminuirCantidad(producto) {

    // * Evitar cantidades iguales o inferiores a cero
    if (producto.cantidad > 1) {

        // * Se disminuye cantidad :c
        producto.cantidad--;

        // * Return
        return true;
    }

    // * Return
    return false;

}

// * Función para actualizar cantidades
export function actualizarCantidad(idProducto, cantidadNueva) {

    // * Se recupera carrito
    const carrito = obtenerCarrito();

    // * Se busca producto
    const producto = carrito.find(
        producto => String(producto.id) === String(idProducto)
    );

    // * Se valida que el producto exista
    if (!producto) {
        notificarError("No se encontró el producto.");
        return false;
    }

    // * Se convierte cantidad a número
    const cantidad = Number(cantidadNueva);

    // * Se valida cantidad y stock
    if (
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > Number(producto.stock)
    ) {
        notificarError("Cantidad inválida o supera el stock disponible.");
        return false;
    }

    // * Se actualizan las cantidad
    producto.cantidad = cantidad;

    // * Se guardan cambios
    guardarCarrito(carrito);

    notificarExito("Cantidad actualizada.");

    // * Return
    return true;
}

// * Función para eliminar producto del carrito
export function eliminarProducto(idProducto) {

    return confirmarAccion(
        "¿Eliminar producto?",
        "Este producto se retirará de tu carrito."
    ).then((resultado) => {

        if (resultado.isConfirmed) {

            // * Se recupera carrito
            const carrito = obtenerCarrito();

            // * Se filtra productos
            const nuevoCarrito = carrito.filter(
                producto => String(producto.id) !== String(idProducto)
            );

            // * Guardar carrito actualizado
            guardarCarrito(nuevoCarrito);
            notificarExito("Producto eliminado.");
            
            return true;

        }

        return false;

    });
}

// * Función para calcular subtotal
export function calcularSubtotal() {

    // * Se recupera carrito
    const carrito = obtenerCarrito();

    // * Se calcula recorriendo cada producto
    const subtotales = carrito.map(producto => {
        return Number(producto.precio) * Number(producto.cantidad);
    });

    // * Return
    return subtotales;
}

// * Función para calcular total
export function calcularTotal() {

    // * Se capturan los subtotales
    const subtotales = calcularSubtotal();

    // * Return aplicando reduce() para sumar subtotales
    return subtotales.reduce((total, subtotal) => {
        return total + subtotal;
    }, 0);
}

// * Función para limpiar carrito (Elimina todo lo del carrito)
export function vaciarCarrito() {

    // * Se recupera carrito
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        notificarError("Tu carrito ya está vacío.");
        return false;
    }

    return confirmarAccion(
        "¿Vaciar carrito?",
        "Se eliminarán todos los productos."
    ).then((resultado) => {

        if (resultado.isConfirmed) {

            // * Se actualiza localStorage con nuevo carrito desocupao
            guardarCarrito([]);

            notificarExito("Carrito vaciado correctamente.");

            return true;

        }

        return false;

    });
}