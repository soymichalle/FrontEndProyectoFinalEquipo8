// * Se importan los metodos necesarios
import { agregarProducto } from "../carrito/js/carrito.js";

// Esperar a que cargue la pagina
document.addEventListener('DOMContentLoaded', function () {

    const contenedor = document.getElementById('catalogo-productos');
    const inputBuscar = document.getElementById('input-buscar');
    const btnBuscar = document.getElementById('btn-buscar');
    const selectOrdenar = document.getElementById('select-ordenar');

    // 1. Obtener los productos que se guardaron desde el admin
    function cargarProductos() {
        const guardados = localStorage.getItem('productos');
        if (guardados) {
            return JSON.parse(guardados);
        } else {
            return [];
        }
    }

    // 2. Mostrar y filtrar los productos
    function mostrarProductos() {
        if (!contenedor) return;

        let lista = cargarProductos();
        const texto = inputBuscar ? inputBuscar.value.toLowerCase().trim() : '';
        const orden = selectOrdenar ? selectOrdenar.value : 'recientes';

        // Filtrar por nombre o categoria
        if (texto !== '') {
            lista = lista.filter(function (vino) {
                const nombreOk = vino.nombre && vino.nombre.toLowerCase().includes(texto);
                const categoriaOk = vino.categoria && vino.categoria.toLowerCase().includes(texto);
                return nombreOk || categoriaOk;
            });
        }

        // Ordenar la lista
        if (orden === 'menor') {
            lista.sort(function (a, b) {
                return Number(a.precio) - Number(b.precio);
            });
        } else if (orden === 'mayor') {
            lista.sort(function (a, b) {
                return Number(b.precio) - Number(a.precio);
            });
        } else if (orden === 'recientes') {
            lista.reverse();
        }

        // Limpiar solo los productos dinamicos agregados previamente por JS
        const dinamicosPrevios = contenedor.querySelectorAll('.producto-dinamico');
        dinamicosPrevios.forEach(function (card) {
            card.remove();
        });

        // Crear e insertar cada card de los productos guardados
        lista.forEach(function (vino) {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 producto-dinamico';

            col.innerHTML = `
                <div class="card h-100 cristal text-white border-0">
                    <img src="${vino.imagen || 'assets/imagenes/default.jpg'}" class="card-img-top" alt="${vino.nombre}" style="height: 220px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${vino.categoria}</span>
                        <h4 class="card-title text-capitalize">${vino.nombre}</h4>
                        <p class="card-text small text-white-50">Proveedor: ${vino.proveedor}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                            <span class="fw-bold fs-5">$${Number(vino.precio).toLocaleString('es-CO')}</span>
                            <button class="btn btn-terracota btn-sm" data-id="${vino.id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;

            contenedor.appendChild(col);
        });
    }

    // 3. Eventos del buscador y del selector
    if (inputBuscar) {
        inputBuscar.addEventListener('input', mostrarProductos);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', mostrarProductos);
    }

    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', mostrarProductos);
    }

    // Ejecutar al cargar la vista
    mostrarProductos();

    // * Evento para agregar productos al carrito
    contenedor.addEventListener('click', (event) => {

        // * Se captura data del boton
        const boton = event.target.closest('[data-id]');

        // * Si no hay boton retorna vacio
        if (!boton) return;

        // * Se captura del boton el id del producto
        const id = boton.dataset.id;

        // * Encuentra producto con el id capturado
        const producto = cargarProductos().find(
            vino => String(vino.id) === id
        );

        // * Se valida si se encuentra el producto y se llama a la función agregar de carrito.js
        if (producto) {
            agregarProducto(producto);
        }

    });
});