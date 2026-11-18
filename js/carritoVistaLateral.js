import {
    obtenerCarrito,
    guardarCarrito,
    aumentarCantidad,
    disminuirCantidad
} from "../carrito/js/carrito.js";

// Calcula si estamos en una subcarpeta (/registro/, /carrito/, /admin/)
function obtenerRutaBase() {
    const ruta = window.location.pathname;
    if (ruta.includes("/registro/") || ruta.includes("/carrito/") || ruta.includes("/admin/")) {
        return "../";
    }
    return "./";
}

// Formatea precios en pesos colombianos
function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CO");
}

// Calcula el total del carrito
function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach(producto => {
        total += Number(producto.precio) * Number(producto.cantidad);
    });
    return total;
}

// Elimina un producto del carrito por su id
function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const carritoActualizado = carrito.filter(producto => String(producto.id) !== String(idProducto));
    guardarCarrito(carritoActualizado);
}

// Actualiza el numerito del carrito en la barra de navegación
export function actualizarContadorNavbar() {
    const carrito = obtenerCarrito();
    let totalProductos = 0;

    carrito.forEach(producto => {
        totalProductos += Number(producto.cantidad);
    });

    const badges = document.querySelectorAll(".carrito-badge");
    badges.forEach(badge => {
        badge.textContent = totalProductos;
    });
}

// Crea el panel lateral de Bootstrap (Offcanvas)
function crearOffcanvasCarrito() {
    if (document.getElementById("offcanvasCarrito")) return;

    const base = obtenerRutaBase();
    const rutaVerCarrito = `${base}carrito/carrito.html`;
    const rutaCatalogo = `${base}catalogo.html`;

    const panelHTML = `
        <div class="offcanvas offcanvas-end text-white" tabindex="-1" id="offcanvasCarrito" aria-labelledby="tituloOffcanvasCarrito" style="background-color: #1a1114; width: 380px; z-index: 999999;">
            <div class="offcanvas-header border-bottom border-secondary">
                <h5 class="offcanvas-title fw-bold" id="tituloOffcanvasCarrito">
                    <i class="fa-solid fa-cart-shopping me-2"></i>Tu carrito
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>

            <div id="bloque-resumen-lateral" class="p-3 border-bottom border-secondary">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-white-50">Total:</span>
                    <span id="total-carrito-lateral" class="fs-4 fw-bold">$0</span>
                </div>
                <a href="${rutaVerCarrito}" class="btn btn-terracota w-100 fw-semibold">
                    Ver carrito
                </a>
            </div>

            <div class="offcanvas-body" id="cuerpo-carrito-lateral"></div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", panelHTML);
    if (!document.getElementById("estilo-offcanvas-carrito")) {
        document.head.insertAdjacentHTML("beforeend", `
            <style id="estilo-offcanvas-carrito">
                .offcanvas-backdrop { z-index: 999998 !important; }
                #offcanvasCarrito { z-index: 999999 !important; }
            </style>
        `);
    }
}

// Dibuja los productos dentro del carrito lateral
export function renderizarCarritoLateral() {
    crearOffcanvasCarrito();
    actualizarContadorNavbar();

    const cuerpo = document.getElementById("cuerpo-carrito-lateral");
    const bloqueResumen = document.getElementById("bloque-resumen-lateral");
    const textoTotal = document.getElementById("total-carrito-lateral");

    if (!cuerpo) return;

    const carrito = obtenerCarrito();
    const base = obtenerRutaBase();
    const rutaCatalogo = `${base}catalogo.html`;

    if (carrito.length === 0) {
        bloqueResumen.classList.add("d-none");

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

    bloqueResumen.classList.remove("d-none");
    textoTotal.textContent = formatearPrecio(calcularTotal(carrito));
    cuerpo.innerHTML = "";

    carrito.forEach(vino => {
        const subtotal = Number(vino.precio) * Number(vino.cantidad);
        let imagen = vino.imagen || `${base}assets/imagenes/default.jpg`;

        if (base === "../" && imagen.startsWith("assets/")) {
            imagen = `../${imagen}`;
        }

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

// Abre el panel lateral con Bootstrap Offcanvas
export function abrirCarritoLateral() {
    renderizarCarritoLateral();
    const offcanvasElemento = document.getElementById("offcanvasCarrito");
    if (offcanvasElemento) {
        const panelBootstrap = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElemento);
        panelBootstrap.show();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    crearOffcanvasCarrito();
    renderizarCarritoLateral();

    document.addEventListener("click", (event) => {
        // Abrir panel lateral al dar clic en el carrito del header
        const btnCarritoNav = event.target.closest(".btn-carrito");
        if (btnCarritoNav) {
            event.preventDefault();
            abrirCarritoLateral();
            return;
        }

        // Sumar cantidad (+)
        const btnSumar = event.target.closest(".btn-sumar-item");
        if (btnSumar) {
            const id = btnSumar.dataset.id;
            const carrito = obtenerCarrito();
            const producto = carrito.find(item => String(item.id) === String(id));

            if (producto) {
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

        // Restar cantidad (-)
        const btnRestar = event.target.closest(".btn-restar-item");
        if (btnRestar) {
            const id = btnRestar.dataset.id;
            const carrito = obtenerCarrito();
            const producto = carrito.find(item => String(item.id) === String(id));

            if (producto && disminuirCantidad(producto)) {
                guardarCarrito(carrito);
                renderizarCarritoLateral();
            }
            return;
        }

        // Eliminar producto
        const btnEliminar = event.target.closest(".btn-eliminar-item");
        if (btnEliminar) {
            const id = btnEliminar.dataset.id;
            eliminarDelCarrito(id);
            renderizarCarritoLateral();
        }
    });
});