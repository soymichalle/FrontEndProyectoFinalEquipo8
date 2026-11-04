// Inserción de datos del formulario

const idProducto = document.getElementById("id-producto");
const nombreProducto = document.getElementById("nombre-producto");
const nombreProveedor = document.getElementById("nombre-proveedor");
const CATEGORIA = document.getElementById("categoria-producto");
const PRECIO = document.getElementById("precio-producto");
const STOCK = document.getElementById("stock-producto");
const IMAGEN = document.getElementById("imagen-producto");

const addProducto = {
    id: idProducto.value,
    nombre: nombreProducto.value,
    proveedor: nombreProveedor.value,
    categoria: CATEGORIA.value,
    precio: PRECIO.value,
    stock: STOCK.value,
    imagen: IMAGEN.value
};

console.log(addProducto);