// INSERCIÓN DE VALORES EN LOS DATOS DEL FORM

// Este comentario es de prueba (se eliminará cuando se compruebe si está bien)

// Calling elemento form al js
const formulario = document.querySelector("form");

// Evento para que cuando se haga enter se pase al siguiente recuadro
formulario.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const campos = Array.from(
            formulario.querySelectorAll("input, select, textarea")
        );

        const indiceActual = campos.indexOf(event.target);

        if (indiceActual < campos.length - 1) {
            campos[indiceActual + 1].focus();
        }
    }
});

// Vista previa de imagen
const inputImagen = document.getElementById("imagen-producto");
const imgPrevia = document.getElementById("vista-previa");

inputImagen.addEventListener("change", () => {
    const archivo = inputImagen.files[0];

    if (archivo) {
        imgPrevia.src = URL.createObjectURL(archivo);
        imgPrevia.classList.remove("d-none");
    }
});

// Mostrar/Ocultar formulario
const btnAgregarProducto = document.getElementById("btn-agregar-producto");
const formularioProducto = document.getElementById("formulario-producto");

btnAgregarProducto.addEventListener("click", () => {
    formularioProducto.classList.toggle("d-none");
});

// Guardar producto
const form = document.getElementById("form-producto");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const aggProducto = {
            ID: Date.now(),
            nombre: document.getElementById("nombre-producto").value,
            nombreProveedor: document.getElementById("nombre-proveedor").value,
            categoria: document.getElementById("categoria-producto").value,
            precio: Number(document.getElementById("precio-producto").value),
            stock: Number(document.getElementById("stock-producto").value),
            imagen: imgPrevia.src || ""
        };

        const productos =
            JSON.parse(localStorage.getItem("productos")) || [];

        productos.push(aggProducto);

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );

        mostrarProductos();

        form.reset();

        imgPrevia.src = "";
        imgPrevia.classList.add("d-none");

        alert("El producto se guardó exitosamente.");

        
    });
}