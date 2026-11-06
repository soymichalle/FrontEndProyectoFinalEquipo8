// admin/filtrolsproductos.js
// Filtro en tiempo real independiente - Johan

document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscador-productos");

  if (inputBuscador) {
    inputBuscador.addEventListener("input", (e) => {
      const texto = e.target.value.toLowerCase().trim();

      // Selecciona todas las filas que dibujó el script de Michelle en el cuerpo de la tabla
      const filas = document.querySelectorAll("#cuerpo-tabla tr");

      filas.forEach((fila) => {
        // Lee todo el contenido de texto que tiene esa fila
        const contenidoFila = fila.textContent.toLowerCase();

        // Muestra u oculta la fila según la coincidencia
        if (contenidoFila.includes(texto)) {
          fila.style.display = "";
        } else {
          fila.style.display = "none";
        }
      });
    });
  }
});