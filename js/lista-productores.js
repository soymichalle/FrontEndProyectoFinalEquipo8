// * Se definen constantes
const productores = [

    {
        id: 1,
        nombre: "María Fernanda Ríos",
        municipio: "Guacarí",
        corregimiento: "Guabas",
        vereda: "Zona rural de Guabas",
        ubicacion: "Guabas, Guacarí, Valle del Cauca",
        actividad: "Tradición vitivinícola",
        producto: "Uva Isabella",
        imagen: "img-productores/prod-1.png",
        testimonio: "Cada cosecha representa el esfuerzo de nuestras familias y el amor por la tierra que trabajamos."
    },

    {
        id: 2,
        nombre: "Julián Herrera",
        municipio: "Guadalajara de Buga",
        corregimiento: "La Habana",
        vereda: "Zona rural de La Habana",
        ubicacion: "La Habana, Buga, Valle del Cauca",
        actividad: "Frutos de nuestra tierra",
        producto: "Lulo",
        imagen: "img-productores/prod-2.png",
        testimonio: "Los frutos de nuestra tierra tienen una historia que merece ser conocida y compartida."
    },

    {
        id: 3,
        nombre: "Lucía Martínez",
        municipio: "La Unión",
        corregimiento: "Zona rural",
        vereda: "Por definir",
        ubicacion: "La Unión, Valle del Cauca",
        actividad: "Productos artesanales",
        producto: "Maracuyá",
        imagen: "img-productores/prod-3.png",
        testimonio: "Trabajar con nuestros frutos es una forma de conservar las tradiciones de nuestra región."
    },

    {
        id: 4,
        nombre: "Carlos Alberto Gómez",
        municipio: "Ulloa",
        corregimiento: "Zona rural",
        vereda: "Por definir",
        ubicacion: "Ulloa, Valle del Cauca",
        actividad: "Tradición cafetera",
        producto: "Café colombiano",
        imagen: "img-productores/prod-4.png",
        testimonio: "El café colombiano tiene una identidad especial, construida con paciencia y dedicación."
    },

    {
        id: 5,
        nombre: "Vicente Rueda",
        municipio: "La Unión",
        corregimiento: "Zona rural",
        vereda: "Por definir",
        ubicacion: "La Unión, Valle del Cauca",
        actividad: "Tradición vitivinícola",
        producto: "Uva Isabella",
        imagen: "img-productores/prod-5.png",
        testimonio: "Llevo toda una vida entre estas viñas. Aprendí de mis padres que la tierra tiene sus tiempos y que las mejores cosas se hacen con paciencia. Cada cosecha guarda un pedacito de nuestra historia."
    }

];

// * Se definen elementos del DOM
const listaProductores = document.getElementById("listaProductores");
const productorDestacado = document.getElementById("productorDestacado");
const contenidoDestacado = document.querySelector(".destacado-contenido");
const nombreDestacado = document.getElementById("nombreDestacado");
const ubicacionDestacado = document.getElementById("ubicacionDestacado");
const textoDestacado = document.getElementById("textoDestacado");

let temporizador;

// * Función de mostrar listado
function mostrarProductores() {

    listaProductores.innerHTML = "";

    productores.forEach(productor => {

        listaProductores.innerHTML += `
            <button type="button"
                class="list-group-item list-group-item-action d-flex align-items-center gap-3 productor-item" data-id="${productor.id}" aria-pressed="false">

                <img src="${productor.imagen}" class="foto-productor" alt="Productor de ${productor.producto}">

                <div class="info-productor">

                    <span>${String(productor.id).padStart(2, "0")} / ${productor.ubicacion.toUpperCase()}</span>
                    <h5>${productor.nombre}</h5>
                    <p>${productor.actividad}</p>

                </div>
            </button>`;

    });
}

// * Función para mostrar productor
function mostrarDestacado(productor) {

    if (!productor) return;

    clearTimeout(temporizador);

    // * Animación de salida
    contenidoDestacado.classList.add("animando");

    temporizador = setTimeout(() => {

        // * Actualizar información
        nombreDestacado.textContent = productor.nombre;

        ubicacionDestacado.textContent = productor.ubicacion;

        textoDestacado.textContent = `"${productor.testimonio}"`;

        // * Cambiar imagen de fondo
        productorDestacado.style.backgroundImage =
            `url("${productor.imagen}")`;

        // * Animación de entrada
        contenidoDestacado.classList.remove("animando");

    }, 350);
}

// * Se activa al seleccionar un productor de la lista
listaProductores.addEventListener("click", (event) => {

    const elemento = event.target.closest(".productor-item");

    if (!elemento) return;

    // * Obtener ID
    const id = Number(elemento.dataset.id);

    // * Buscar productor
    const productorSeleccionado = productores.find(
        productor => productor.id === id
    );

    if (!productorSeleccionado) return;
    
    // * Actualizar selección visual
    const elementos = listaProductores.querySelectorAll(".productor-item");

    elementos.forEach(item => {

        item.classList.remove("activo");
        item.setAttribute("aria-pressed", "false");

    });

    elemento.classList.add("activo");
    elemento.setAttribute("aria-pressed", "true");

    // * Actualizar
    mostrarDestacado(productorSeleccionado);

});

mostrarProductores();

// * Mostrar primer productor al cargar
mostrarDestacado(productores[0]);

// * Marcar primer productor como seleccionado
const primerProductor = listaProductores.querySelector(".productor-item");

if (primerProductor) {

    primerProductor.classList.add("activo");
    primerProductor.setAttribute("aria-pressed", "true");

}