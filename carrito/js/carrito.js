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
    const productoExistente = carrito.find(producto => producto.id === productoNuevo.id);

    // * Se valida si se encontró el producto en carrito
    if (productoExistente) {
        
        // * Si existe aumenta cantidad
        aumentarCantidad(productoExistente);

    } else {

        // * Si no, crea un nuevo elemento en carrito
        carrito.push({...productoNuevo, cantidad: 1});
    }
    
    // * Se actualiza carrito
    guardarCarrito(carrito);

    // * Se notifica al usuario
    // notificarProductoGuardado();

    console.log("Producto añadido correctamente");
    console.log(carrito);
}

// ! Funcion para Johan
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

// ! Funcion para Johan
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
        return false;
    }

    // * Se actualizan las cantidad
    producto.cantidad = cantidad;

    // * Se guardan cambios
    guardarCarrito(carrito);

    // * Return
    return true;
}

// * Función para eliminar producto del carrito
export function eliminarProducto() {

}

// * Función para calcular subtotal
export function calcularSubtotal() {

}

// * Función para calcular total
export function calcularTotal() {

}

// * Función para limpiar carrito (Elimina todo lo del carrito)
export function vaciarCarrito() {

}

// * Funciones para notificar actualizacion a los modulos visuales del carrito

// * EXITOSAS

// ! Esto tambien se puede optimizar hmmmm...

// * Función para notificación de producto agregado
export function notificarProductoAgregado() {

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Producto cargado en tu carrito!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

}

// * Función para notificación de producto guardado en carrito correctamente
export function notificarProductoGuardado() {

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Producto cargado en tu carrito!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

}

// * FALLIDAS

// ! PDTES: Creo que podemos optimizarlas :u

document.addEventListener('change', (event) => {

    if (event.target.classList.contains('input-cantidad')) {

        const input = event.target;
        const id = input.dataset.id;
        const cantidad = input.value;

        const actualizado = actualizarCantidad(id, cantidad);

        if (actualizado) {
            console.log("Cantidad actualizada");
            // * Aquí actualizaremos los subtotales y el total.... proximamente jejeje
        } else {
            console.log("Cantidad no válida");

            // * Proximamente es que ya me canse. No doy mas jefe
            // Recuperar cantidad anterior para restaurar el input.
            // Podemos hacerlo consultando nuevamente el carrito.
        }
    }

});