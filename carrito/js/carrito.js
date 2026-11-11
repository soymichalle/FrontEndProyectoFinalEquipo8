// ! Datos de prueba
const productos = [
    {
        id: 1,
        nombre: "BoronVino Reserva",
        precio: 45000,
        cantidad: 2
    },
    {
        id: 2,
        nombre: "BoronVino Rosé",
        precio: 35000,
        cantidad: 1
    }
];

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

    // * Se valida que no este vacio
    if(productos === 0) {

        // * Se guarda el carrito en localStorage
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));

        // * Se actualizan cantidades
        actualizarCantidad();

        // * Return
        return "cargado en carrito";
    }

}

// *  Función para agregar/auemntar cantidad de producto
export function agregarProducto() {

}

// * Función para aumentar unidades
export function aumentarCantidad() {
    
}

// * Función para disminuir unidades
export function disminuirCantidad() {
    
}

// * Función para actualizar cantidades
export function actualizarCantidad() {
    
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

// * Función para notificación de producto agregado
export function notificarProductoAgregado() {

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "¡Cargado en tu carrito!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

}