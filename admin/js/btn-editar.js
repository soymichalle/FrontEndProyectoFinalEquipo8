document.getElementById("cuerpo-tabla").addEventListener("click", (e) => {


  const boton = e.target.closest(".btn-editar");

  if (!boton) return;

  const fila = boton.closest("tr");

  // * Recuperamos el ID del producto
  const idProducto = Number(fila.dataset.id);

  // * Recuperamos los productos de localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  // * Se identifican celdas
  const celdaNombre = fila.querySelector(".campo-nombre");
  const celdaProveedor = fila.querySelector(".campo-proveedor");
  const selectCategoria = fila.querySelector(".campo-categoria select");
  const celdaPrecio = fila.querySelector(".campo-precio");
  const celdaStock = fila.querySelector(".campo-stock");

  const enEdicion = boton.classList.contains("en-edicion");

  if (!enEdicion) {

    const valNombre = celdaNombre.textContent.trim();
    const valProveedor = celdaProveedor.textContent.trim();
    const valPrecio = celdaPrecio.textContent.trim();
    const valStock = celdaStock.textContent.trim();

    celdaNombre.innerHTML = `<input type="text" class="form-control form-control-sm input-nombre" value="${valNombre}">`;
    celdaProveedor.innerHTML = `<input type="text" class="form-control form-control-sm input-proveedor" value="${valProveedor}">`;

    selectCategoria.removeAttribute("disabled");

    celdaPrecio.innerHTML = `<input type="number" class="form-control form-control-sm input-precio" value="${valPrecio}">`;
    celdaStock.innerHTML = `<input type="number" class="form-control form-control-sm input-stock" value="${valStock}">`;

    boton.textContent = "Guardar";
    boton.classList.remove("btn-primary");
    boton.classList.add("btn-success", "en-edicion");

  } else {

    const nuevoNombre = fila.querySelector(".input-nombre").value.trim();
    const nuevoProveedor = fila.querySelector(".input-proveedor").value.trim();
    const nuevaCategoria = selectCategoria.value;
    const nuevoPrecio = Number(fila.querySelector(".input-precio").value);
    const nuevoStock = Number(fila.querySelector(".input-stock").value);


    if (
      !nuevoNombre ||
      !nuevoProveedor ||
      !nuevaCategoria ||
      !Number.isFinite(nuevoPrecio) ||
      nuevoPrecio <= 0 ||
      !Number.isInteger(nuevoStock) ||
      nuevoStock < 0
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const productoEncontrado = productos.find(p => p.id === idProducto);

    if (!productoEncontrado) {
      alert("No se encontró el producto.");
      return;
    }

    // * Se actualizan sus propiedades
    productoEncontrado.nombre = nuevoNombre;
    productoEncontrado.proveedor = nuevoProveedor;
    productoEncontrado.categoria = nuevaCategoria;
    productoEncontrado.precio = nuevoPrecio;
    productoEncontrado.stock = nuevoStock;

    // * Actualizamos localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    celdaNombre.textContent = nuevoNombre;
    celdaProveedor.textContent = nuevoProveedor;

    selectCategoria.setAttribute("disabled", "true");

    celdaPrecio.textContent = nuevoPrecio;
    celdaStock.textContent = nuevoStock;

    boton.textContent = "Editar";
    boton.classList.remove("btn-success", "en-edicion");
    boton.classList.add("btn-primary");

    console.log("Producto actualizado con éxito:", productoEncontrado);
  }

});