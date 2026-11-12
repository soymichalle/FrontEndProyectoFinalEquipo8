// LOGICA DE BTN AGG CARRITO => PRODUCTO EN CARRITO

const addCarrito = document.getElementById("btnAddCarrito");

// Se guardan productos
addCarrito.addEventListener("click", (event) => {

    event.preventDefault();

    // Se recuperan los productos existentes
    const productOnCarrito = JSON.parse(localStorage.getItem("productOnCarrito")) || [];

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
});


// Se almacena en localstorage
function addToCarrito(productAdded, productOnCarrito) {

    // Se agregan el nuevo producto al array
    productAdded.push(productOnCarrito);

    // Se actualiza localStorage
    localStorage.setItem("productOnCarrito", JSON.stringify(productOnCarrito));

    alert("¡Producto agregado al Carrito!");

    // Se actualiza la tabla administrativa
    // Aquí irá la función que muestra cómo se visualizarán los productos en el carrito

    
}