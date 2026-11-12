// Importamos las funciones del carrito que dejó listas Michalle
import {
    obtenerCarrito,
    guardarCarrito,
    aumentarCantidad,
    disminuirCantidad
} from "../carrito/js/carrito.js";

// Función para formatear precios en pesos colombianos
function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CO");
}

// Función para calcular el total general del carrito
function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach(function (producto) {
        total += Number(producto.precio) * Number(producto.cantidad);
    });
    return total;
}

// Función para eliminar un producto del carrito por su id
function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const nuevoCarrito = carrito.filter(function (producto) {
        return String(producto.id) !== String(idProducto);
    });
    guardarCarrito(nuevoCarrito);
}

// Función para actualizar el contador del carrito en el navbar
export function actualizarContadorNavbar() {
    const carrito = obtenerCarrito();
    let totalProductos = 0;

    carrito.forEach(function (producto) {
        totalProductos += Number(producto.cantidad);
    });

    const badges = document.querySelectorAll(".carrito-badge");
    badges.forEach(function (badge) {
        badge.textContent = totalProductos;
    });
}

// Función para crear la estructura del panel lateral (Bootstrap Offcanvas) en el HTML
function crearOffcanvasCarrito() {
    // Si ya existe en la página, no lo volvemos a crear
    if (document.getElementById("offcanvasCarrito")) return;

    // Verificamos si estamos dentro de la carpeta /carrito/ para ajustar el enlace del botón
    const enCarpetaCarrito = window.location.pathname.includes("/carrito/");
    const rutaVerCarrito = enCarpetaCarrito ? "carrito.html" : "carrito/carrito.html";
    const rutaCatalogo = enCarpetaCarrito ? "../catalogo.html" : "catalogo.html";

    const panelHTML = `
        <div class="offcanvas offcanvas-end text-white" tabindex="-1" id="offcanvasCarrito" aria-labelledby="tituloOffcanvasCarrito" style="background-color: #1a1114; width: 380px; z-index: 2000;"
            
            <!-- Encabezado del panel -->
            <div class="offcanvas-header border-bottom border-secondary">
                <h5 class="offcanvas-title fw-bold" id="tituloOffcanvasCarrito">
                    <i class="fa-solid fa-cart-shopping me-2"></i>Tu carrito
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>

            <!-- Bloque superior con total y botón Ver carrito -->
            <div id="bloque-resumen-lateral" class="p-3 border-bottom border-secondary">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-white-50">Total:</span>
                    <span id="total-carrito-lateral" class="fs-4 fw-bold">$0</span>
                </div>
                <a href="${rutaVerCarrito}" class="btn btn-terracota w-100 fw-semibold">
                    Ver carrito
                </a>
            </div>

            <!-- Contenedor donde se pintan los productos o el mensaje de vacío -->
            <div class="offcanvas-body" id="cuerpo-carrito-lateral" data-ruta-catalogo="${rutaCatalogo}">
            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", panelHTML);
}

// Función principal para pintar los productos dentro del carrito lateral
export function renderizarCarritoLateral() {
    crearOffcanvasCarrito();
    actualizarContadorNavbar();

    const cuerpo = document.getElementById("cuerpo-carrito-lateral");
    const bloqueResumen = document.getElementById("bloque-resumen-lateral");
    const textoTotal = document.getElementById("total-carrito-lateral");

    if (!cuerpo) return;

    const carrito = obtenerCarrito();
    const rutaCatalogo = cuerpo.dataset.rutaCatalogo || "catalogo.html";

    // Validar si el carrito está vacío
    if (carrito.length === 0) {
        if (bloqueResumen) bloqueResumen.classList.add("d-none");

        cuerpo.innerHTML = `
            <div class="text-center py-5">
                <i class="fa-solid fa-wine-bottle fa-3x text-white-50 mb-3"></i>
                <h6 class="fw-bold">Tu carrito está vacío</h6>
                <p class="small text-white-50 mb-4">
                    Aún no has agregado vinos a tu carrito. Explora nuestro catálogo y elige tus favoritos.
                </p>
                <a href="${rutaCatalogo}" class="btn btn-terracota btn-sm px-4">
                    Ir al catálogo
                </a>
            </div>
        `;
        return;
    }

    // Si hay productos, mostramos el resumen superior y actualizamos el total
    if (bloqueResumen) bloqueResumen.classList.remove("d-none");
    if (textoTotal) {
        textoTotal.textContent = formatearPrecio(calcularTotal(carrito));
    }

    // Limpiamos y recorremos los productos del carrito
    cuerpo.innerHTML = "";

    carrito.forEach(function (vino) {
        const subtotal = Number(vino.precio) * Number(vino.cantidad);
        const imagen = vino.imagen || "assets/imagenes/default.jpg";
        const descripcion = vino.descripcion || `${vino.categoria || "Vino artesanal"} - ${vino.proveedor || "BoronVino"}`;

        const tarjeta = document.createElement("div");
        tarjeta.className = "card cristal text-white border-secondary mb-3 p-2";

        tarjeta.innerHTML = `
            <div class="d-flex gap-3 align-items-center">
                <img src="${imagen}" alt="${vino.nombre}" class="rounded" style="width: 70px; height: 85px; object-fit: cover;">
                
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <h6 class="fw-bold text-capitalize mb-1">${vino.nombre}</h6>
                        <button type="button" class="btn btn-sm text-danger p-0 btn-eliminar-item" data-id="${vino.id}" title="Eliminar producto">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>

                    <p class="small text-white-50 mb-1">${descripcion}</p>
                    <p class="small mb-2">Precio unitario: <strong>${formatearPrecio(vino.precio)}</strong></p>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-outline-light btn-restar-item" data-id="${vino.id}">-</button>
                            <span class="px-2 d-flex align-items-center fw-bold">${vino.cantidad}</span>
                            <button type="button" class="btn btn-outline-light btn-sumar-item" data-id="${vino.id}">+</button>
                        </div>

                        <span class="small fw-bold">Subtotal: ${formatearPrecio(subtotal)}</span>
                    </div>
                </div>
            </div>
        `;

        cuerpo.appendChild(tarjeta);
    });
}

// Función para abrir el panel lateral desde cualquier evento
export function abrirCarritoLateral() {
    renderizarCarritoLateral();
    const offcanvasElemento = document.getElementById("offcanvasCarrito");
    if (offcanvasElemento) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElemento);
        bsOffcanvas.show();
    }
}

// Esperar a que cargue el DOM para activar los eventos
document.addEventListener("DOMContentLoaded", function () {
    crearOffcanvasCarrito();
    renderizarCarritoLateral();

    // Delegación de eventos para abrir el carrito y manejar los botones internos
    document.addEventListener("click", function (event) {
        // 1. Clic en el botón del carrito del navbar
        const btnCarritoNav = event.target.closest(".btn-carrito");
        if (btnCarritoNav) {
            event.preventDefault();
            abrirCarritoLateral();
            return;
        }

        // 2. Clic en botón aumentar (+)
        const btnSumar = event.target.closest(".btn-sumar-item");
        if (btnSumar) {
            const id = btnSumar.dataset.id;
            const carrito = obtenerCarrito();
            const producto = carrito.find(function (item) {
                return String(item.id) === String(id);
            });

            if (producto) {
                // Si no tiene stock definido o si aumentarCantidad devuelve true, guardamos
                if (!producto.stock) {
                    producto.cantidad++;
                    guardarCarrito(carrito);
                } else if (aumentarCantidad(producto)) {
                    guardarCarrito(carrito);
                }
                renderizarCarritoLateral();
            }
            return;
        }

        // 3. Clic en botón disminuir (-)
        const btnRestar = event.target.closest(".btn-restar-item");
        if (btnRestar) {
            const id = btnRestar.dataset.id;
            const carrito = obtenerCarrito();
            const producto = carrito.find(function (item) {
                return String(item.id) === String(id);
            });

            if (producto && disminuirCantidad(producto)) {
                guardarCarrito(carrito);
                renderizarCarritoLateral();
            }
            return;
        }

        // 4. Clic en botón eliminar producto
        const btnEliminar = event.target.closest(".btn-eliminar-item");
        if (btnEliminar) {
            const id = btnEliminar.dataset.id;
            eliminarDelCarrito(id);
            renderizarCarritoLateral();
        }
    });
});