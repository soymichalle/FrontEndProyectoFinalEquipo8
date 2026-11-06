let idProductoAEliminar = null;

function eliminarProducto(id) {


    let producto = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].ID === id) {
            producto = productos[i];
            break;
        }
    }

  
    if (producto === null) {
        mostrarMensaje("No se encontró el producto.");
        return;
    }


    idProductoAEliminar = id;


    document.getElementById("nombreProductoEliminar").textContent = producto.nombre;


    let modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modal.show();
}


function confirmarEliminar() {


    if (idProductoAEliminar === null) {
        mostrarMensaje("No hay producto seleccionado.");
        return;
    }

    let posicion = -1;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].ID === idProductoAEliminar) {
            posicion = i;
            break;
        }
    }


    if (posicion === -1) {
        mostrarMensaje("El producto no existe o ya fue eliminado.");
        return;
    }

    productos.splice(posicion, 1);


    let modalElemento = document.getElementById("modalEliminar");
    let modal = bootstrap.Modal.getInstance(modalElemento);
    if (modal) {
        modal.hide();
    }


    mostrarMensaje("Producto eliminado exitosamente");


    idProductoAEliminar = null;


    mostrarProductos();
}


function mostrarMensaje(mensaje) {
    alert(mensaje);
}


document.addEventListener("DOMContentLoaded", function () {

    let botonConfirmar = document.getElementById("btnConfirmarEliminar");
    if (botonConfirmar !== null) {
        botonConfirmar.addEventListener("click", confirmarEliminar);
    }


    let tabla = document.getElementById("cuerpo-tabla");
    if (tabla !== null) {
        tabla.addEventListener("click", function (evento) {
      
            if (evento.target.classList.contains("btn-eliminar")) {
      
                let id = Number(evento.target.dataset.id);
                eliminarProducto(id);
            }
        });
    }
});