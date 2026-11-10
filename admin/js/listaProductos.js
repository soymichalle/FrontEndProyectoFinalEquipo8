// ! Seteos de prueba eliminar cuando corresponde
const categorias = ["Vinos", "Tintos", "Blancos", "Rosados", "Otros"];

// * Función para mostrar los productos en la tabla
export function mostrarProductos() {

    // * Se recuperan los productos de localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // * Se obtiene el cuerpo de la tabla y se limpia su contenido
    const tablaProductos = document.getElementById("cuerpo-tabla");
    tablaProductos.innerHTML = "";

    // * Si no existen productos registrados
    if (productos.length === 0) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td colspan="8" class="text-center py-4">
            No hay productos creados.
        </td>
    `;

        tablaProductos.appendChild(fila);

        return;
    }

    // * Se recorre el array de productos y se crea una fila por cada producto
    productos.forEach(producto => {

        // * Se crea un elemento <tr> para la fila de la tabla
        const fila = document.createElement("tr");
        
        // * Para recuperar el id en btn-editar
        fila.dataset.id = producto.id;

        // * Se crean las opciones del select de categorías, marcando como "selected" la categoría del producto
        const opcionesCategorias = categorias.map(categoria => `
            <option value="${categoria}" 
                ${producto.categoria === categoria ? "selected" : ""}>
                ${categoria}
            </option>
        `).join("");

        // * Se establece el contenido de la fila con los datos del producto y las opciones del select
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td class="campo-nombre">${producto.nombre}</td>
            <td class="campo-proveedor">${producto.nombreProveedor}</td>

            <td class="campo-categoria">
                <select class="form-select" disabled>
                    ${opcionesCategorias}
                </select>
            </td>

            <td class="campo-precio">${formatearPeso(producto.precio)}</td>
            <td class="campo-stock">${producto.stock}</td>

            <td>
                <img src="${producto.imagen}"  alt="${producto.nombre}" class="imagen-producto">
            </td>

            <td>
                <button class="btn btn-primary btn-sm btn-editar" data-id="${producto.id}">
                    Editar
                </button>

                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${producto.id}">
                    Eliminar
                </button>
            </td>
        `;

        // * Se agrega la fila al cuerpo de la tabla
        tablaProductos.appendChild(fila);
    });
}

// * Se llama a la función para mostrar los productos al cargar la página
mostrarProductos();