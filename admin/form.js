// INSERCIÓN DE VALORES EN LOS DATOS DEL FORM

// Calling elemento form al js
const formulario = document.querySelector("form");

// Evento para que cargue lo que el user o admin escriba
formulario.addEventListener("submit", (event) => {
event.preventDefault();

    // Calling id de cada ítem del form del producto a añadir
    const addProducto = {
        id: document.getElementById("id-producto").value,
        nombre: document.getElementById("nombre-producto").value,
        proveedor: document.getElementById("nombre-proveedor").value,
        categoria: document.getElementById("categoria-producto").value,
        precio: document.getElementById("precio-producto").value,
        stock: document.getElementById("stock-producto").value,
        imagen: document.getElementById("imagen-producto").value
    };



    // Console log para prueba
    // Añado este comentario para prueba
    console.log(addProducto);

});

// Evento para que cuando se haga enter se pase al siguiente recuadro y no se envíe directamente
formulario.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const campos = Array.from(
            formulario.querySelectorAll("input, select, textarea")
        );

        // Se define Indice Actual para el Enter
        const indiceActual = campos.indexOf(event.target);

        if (indiceActual < campos.length - 1) {
            campos[indiceActual + 1].focus();
        }
    }
});