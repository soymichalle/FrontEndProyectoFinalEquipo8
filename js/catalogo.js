// Esperamos a que cargue todo el documento
document.addEventListener('DOMContentLoaded', function () {

    const contenedor = document.getElementById('catalogo-productos');
    const inputBuscar = document.getElementById('input-buscar-catalogo');
    const btnBuscar = document.getElementById('btn-buscar-catalogo');
    const selectOrdenar = document.getElementById('select-ordenar-catalogo');

    // Función sencilla para quitar tildes y comparar en minúsculas
    function normalizar(texto) {
        if (!texto) return '';
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    // 1. Cargar productos creados desde el Administrador (localStorage)
    function cargarProductosStorage() {
        if (!contenedor) return;

        const guardados = localStorage.getItem('productos');
        const lista = guardados ? JSON.parse(guardados) : [];

        // Limpiar dinámicos anteriores para no duplicar al recargar
        const viejos = contenedor.querySelectorAll('.producto-dinamico');
        viejos.forEach(function (card) {
            card.remove();
        });

        // Pintar los productos nuevos que guardó el admin
        lista.forEach(function (vino) {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 tarjeta-vino producto-dinamico';

            col.innerHTML = `
                <div class="card h-100 cristal text-white border-0 shadow-sm">
                    <img src="${vino.imagen || 'assets/imagenes/vino1.jpg'}" class="card-img-top" alt="${vino.nombre}" style="height: 220px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${vino.categoria}</span>
                        <h4 class="card-title text-capitalize">${vino.nombre}</h4>
                        <p class="card-text small text-white-50">Proveedor: ${vino.proveedor}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                            <span class="fw-bold fs-5">$${Number(vino.precio).toLocaleString('es-CO')}</span>
                            <button class="btn btn-terracota btn-sm">Agregar</button>
                        </div>
                    </div>
                </div>
            `;

            contenedor.appendChild(col);
        });
    }

    // 2. Filtrar tanto las 10 tarjetas base como las de localStorage
    function filtrarVinos() {
        if (!contenedor || !inputBuscar) return;

        const textoBusqueda = normalizar(inputBuscar.value);
        const tarjetas = contenedor.querySelectorAll('.tarjeta-vino');

        tarjetas.forEach(function (tarjeta) {
            const textoTarjeta = normalizar(tarjeta.textContent);

            // Si el buscador está vacío o el texto coincide, se muestra; si no, se oculta
            if (textoBusqueda === '' || textoTarjeta.includes(textoBusqueda)) {
                tarjeta.classList.remove('d-none');
            } else {
                tarjeta.classList.add('d-none');
            }
        });
    }

    // 3. Escuchar los eventos del buscador
    if (inputBuscar) {
        inputBuscar.addEventListener('input', filtrarVinos);
        inputBuscar.addEventListener('keyup', filtrarVinos);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', filtrarVinos);
    }

    // Cargar los productos de localStorage al abrir la página
    cargarProductosStorage();
});