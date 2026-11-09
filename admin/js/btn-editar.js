
document.getElementById("cuerpo-tabla").addEventListener("click", (e) => {
  
  if (e.target.classList.contains("btn-editar")) {
    const boton = e.target;
    const fila = boton.closest("tr");
    
    const idProducto = Number(fila.getAttribute("data-id"));

    const celdaNombre = fila.querySelector(".campo-nombre");
    const celdaProveedor = fila.querySelector(".campo-proveedor");
    const selectCategoria = fila.querySelector(".campo-categoria select");
    const celdaPrecio = fila.querySelector(".campo-precio");
    const celdaStock = fila.querySelector(".campo-stock");

    const enEdicion = boton.classList.contains("en-edicion");

    if (!enEdicion) {
      
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
      
      const nuevoNombre = fila.querySelector(".input-nombre").value.trim();
      const nuevoProveedor = fila.querySelector(".input-proveedor").value.trim();
      const nuevaCategoria = selectCategoria.value;
      const nuevoPrecio = Number(fila.querySelector(".input-precio").value);
      const nuevoStock = Number(fila.querySelector(".input-stock").value);


      if (!nuevoNombre || !nuevoProveedor || isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }

      const productos = JSON.parse(localStorage.getItem("productos")) || [];

      const productoEncontrado = productos.find(p => p.ID === idProducto);
      if (productoEncontrado) {
        productoEncontrado.nombre = nuevoNombre;
        productoEncontrado.nombreProveedor = nuevoProveedor;
        productoEncontrado.categoria = nuevaCategoria;
        productoEncontrado.precio = nuevoPrecio;
        productoEncontrado.stock = nuevoStock;

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );
      }

      celdaNombre.textContent = nuevoNombre;
      celdaProveedor.textContent = nuevoProveedor;
      
      selectCategoria.setAttribute("disabled", "true");

      celdaPrecio.textContent = formatearPeso(nuevoPrecio);
      celdaStock.textContent = nuevoStock;

      boton.textContent = "Editar";
      boton.classList.remove("btn-success", "en-edicion");
      boton.classList.add("btn-primary");

      console.log("Producto actualizado con éxito:", productoEncontrado);
    }
  }
});

