// Se importan los métodos necesarios
import { notificarExito, notificarError } from "./alertas.js";
import { agregarProducto } from "../carrito/js/carrito.js";
import { renderizarCarritoLateral, abrirCarritoLateral } from "./carritoVistaLateral.js";

const VINOS_BASE = [
    { id: 1, nombre: "Cabernet Sauvignon Reserva", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 65000, imagen: "./assets/imagenes/catalogo-10vinos/1-png.jpg" },
    { id: 2, nombre: "Malbec del Valle", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 58000, imagen: "./assets/imagenes/catalogo-10vinos/2-jpng.jpg" },
    { id: 3, nombre: "Merlot Clásico", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 54000, imagen: "./assets/imagenes/catalogo-10vinos/3-png.jpg" },
    { id: 4, nombre: "Syrah Crianza", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 72000, imagen: "./assets/imagenes/catalogo-10vinos/4-png.jpg" },
    { id: 5, nombre: "Carménère Selección", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 69000, imagen: "./assets/imagenes/catalogo-10vinos/5-png.jpg" },
    { id: 6, nombre: "Pinot Noir Finca", categoria: "Vino Tinto", proveedor: "BoronVino", precio: 78000, imagen: "./assets/imagenes/catalogo-10vinos/6-png.jpg" },
    { id: 7, nombre: "Chardonnay Roble", categoria: "Vino Blanco", proveedor: "BoronVino", precio: 52000, imagen: "./assets/imagenes/catalogo-10vinos/7-png.jpg" },
    { id: 8, nombre: "Sauvignon Blanc Fresco", categoria: "Vino Blanco", proveedor: "BoronVino", precio: 49000, imagen: "./assets/imagenes/catalogo-10vinos/8-png.jpg" },
    { id: 9, nombre: "Rosé de Verano", categoria: "Vino Rosado", proveedor: "BoronVino", precio: 55000, imagen: "./assets/imagenes/catalogo-10vinos/9-png.jpg" },
    { id: 10, nombre: "Gran Reserva Edición", categoria: "Gran Reserva", proveedor: "BoronVino", precio: 95000, imagen: "./assets/imagenes/catalogo-10vinos/10-png.jpg" }
];

// Esperar a que cargue la página
document.addEventListener('DOMContentLoaded', function () {

    const contenedor = document.getElementById('catalogo-productos');
    const inputBuscar = document.getElementById('input-buscar');
    const btnBuscar = document.getElementById('btn-buscar');
    const selectOrdenar = document.getElementById('select-ordenar');

    // 1. Obtener los productos guardados o inicializar con los 10 vinos base
    function cargarProductos() {
        const guardados = localStorage.getItem('productos');
        if (guardados) {
            try {
                const parsed = JSON.parse(guardados);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch {
                // Si hay JSON inválido, se restaura VINOS_BASE
            }
        }
        localStorage.setItem('productos', JSON.stringify(VINOS_BASE));
        return VINOS_BASE;
    }

    // 2. Mostrar y filtrar los productos
    function mostrarProductos() {
        if (!contenedor) return;

        let lista = [...cargarProductos()];
        const texto = inputBuscar ? inputBuscar.value.toLowerCase().trim() : '';
        const orden = selectOrdenar ? selectOrdenar.value : 'recientes';

        if (texto !== '') {
            lista = lista.filter(function (vino) {
                const nombreOk = vino.nombre && vino.nombre.toLowerCase().includes(texto);
                const categoriaOk = vino.categoria && vino.categoria.toLowerCase().includes(texto);
                return nombreOk || categoriaOk;
            });
        }

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

        const dinamicosPrevios = contenedor.querySelectorAll('.producto-dinamico');
        dinamicosPrevios.forEach(function (card) {
            card.remove();
        });

        lista.forEach(function (vino, idx) {
            const imgPorDefecto = `./assets/imagenes/catalogo-10vinos/${(idx % 10) + 1 === 2 ? '2-jpng.jpg' : `${(idx % 10) + 1}-png.jpg`}`;
            const rutaImagen = vino.imagen || imgPorDefecto;

            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 producto-dinamico';

            col.innerHTML = `
                <div class="card h-100 card-vino border-0 shadow-sm overflow-hidden">
                    <img
                        src="${rutaImagen}"
                        onerror="this.onerror=null; this.src='./assets/imagenes/catalogo-10vinos/1-png.jpg';"
                        class="card-img-top"
                        alt="${vino.nombre}"
                        style="height: 220px; object-fit: cover;"
                    >
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${vino.categoria}</span>
                        <h4 class="card-title text-capitalize">${vino.nombre}</h4>
                        <p class="card-text small">Proveedor: ${vino.proveedor}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                            <span class="fw-bold fs-5">$${Number(vino.precio).toLocaleString('es-CO')}</span>
                            <button type="button" class="btn btn-terracota btn-sm" data-id="${vino.id}">Agregar al carrito</button>
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

    // Evento para agregar productos al carrito
    if (contenedor) {
        contenedor.addEventListener('click', (event) => {
            const boton = event.target.closest('[data-id]');
            if (!boton) return;

            const id = boton.dataset.id;
            const producto = cargarProductos().find(
                vino => String(vino.id) === id
            );

            if (producto) {
                agregarProducto(producto);
                renderizarCarritoLateral();
                abrirCarritoLateral();
            } else {
                notificarError("No se encontró el producto");
            }
        });
    }
});