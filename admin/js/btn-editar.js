
document.getElementById("cuerpo-tabla").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-editar")) {
    const boton = e.target;
    const fila = boton.closest("tr");
    
    // Obtenemos el ID de forma segura (ya sea que esté en el botón o en la fila)
    const idProducto = Number(boton.getAttribute("data-id") || fila.getAttribute("data-id"));

    const celdaNombre = fila.querySelector(".campo-nombre");
    const celdaProveedor = fila.querySelector(".campo-proveedor");
    const selectCategoria = fila.querySelector(".campo-categoria select");
    const celdaPrecio = fila.querySelector(".campo-precio");
    const celdaStock = fila.querySelector(".campo-stock");

    const enEdicion = boton.classList.contains("en-edicion");

    if (!enEdicion) {
      // --- PASAR A MODO EDICIÓN ---
      const valNombre = celdaNombre.textContent.trim();
      const valProveedor = celdaProveedor.textContent.trim();
      const valPrecio = celdaPrecio.textContent.replace(/[^\d]/g, "");
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
      // --- GUARDAR CAMBIOS ---
      const nuevoNombre = fila.querySelector(".input-nombre").value.trim();
      const nuevoProveedor = fila.querySelector(".input-proveedor").value.trim();
      const nuevaCategoria = selectCategoria.value;
      const nuevoPrecio = Number(fila.querySelector(".input-precio").value);
      const nuevoStock = Number(fila.querySelector(".input-stock").value);

      if (!nuevoNombre || !nuevoProveedor || isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }

      // 1. Cargamos el array actual desde el localStorage
      const productos = JSON.parse(localStorage.getItem("productos")) || [];

      // 2. Buscamos y actualizamos el producto correspondiente
      const productoEncontrado = productos.find(p => p.ID === idProducto);
      if (productoEncontrado) {
        productoEncontrado.nombre = nuevoNombre;
        productoEncontrado.nombreProveedor = nuevoProveedor;
        productoEncontrado.categoria = nuevaCategoria;
        productoEncontrado.precio = nuevoPrecio;
        productoEncontrado.stock = nuevoStock;

        // 3. Guardamos los cambios permanentemente en el localStorage
        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );
      } else {
        console.warn("No se encontró el producto con ID:", idProducto);
      }

      // 4. Actualizamos la vista visual de la tabla en tiempo real
      celdaNombre.textContent = nuevoNombre;
      celdaProveedor.textContent = nuevoProveedor;
      
      selectCategoria.setAttribute("disabled", "true");

      // Verificamos si existe la función formatearPeso, si no, mostramos el número directamente
      celdaPrecio.textContent = typeof formatearPeso === "function" ? formatearPeso(nuevoPrecio) : nuevoPrecio;
      celdaStock.textContent = nuevoStock;

      // 5. Devolvemos el botón a su estado original de "Editar"
      boton.textContent = "Editar";
      boton.classList.remove("btn-success", "en-edicion");
      boton.classList.add("btn-primary");

      console.log("Producto actualizado con éxito:", productoEncontrado);
    }
  }
});