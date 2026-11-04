let eliminarProducto = null;

function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let producto = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            producto = productos[i];
            break;
        }
    }

    if (producto === null) {
        mostrarToast("No se encontro el producto.");
        return;
    }

    idProductoAEliminar = id;

    document.getElementById("nombreProductoEliminar").textContent = producto.nombre;

    let modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modal.show();
}

function confirmarEliminarProducto() {

    if (idProductoAEliminar === null) {
        mostrarToast("No hay producto seleccionado.");
        return;
    }
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productosNuevos.length === productos.length) {
        mostrarToast("El producto no existe o ya fue eliminado.");
        return;
    }

    localStorage.setItem("productos", JSON.stringify(productosNuevos));

    let modalElemento = document.getElementById("modalEliminar");
    let modal = bootstrap.Modal.getInstance(modalElemento);
    if (modal) {
        modal.hide();
    }

    mostrarToast("Producto eliminado exitosamente.");

    idProductoAEliminar = null;

    if (typeof renderizarTabla === "function") {
        renderizarTabla();
    }
}

function mostrarMensaje(mensaje, tipo) {

    alert(mensaje);


}



