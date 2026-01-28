const API_URL = "https://equipo6.grupoahost.com/Api/listaProductos.php";
const BASE_IMG = "https://equipo6.grupoahost.com/img/";

document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(productos => renderProductos(productos))
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("productos-container").innerHTML =
                "<p>Error al cargar productos</p>";
        });
}

function renderProductos(productos) {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagen = producto.ImagenText
            ? BASE_IMG + producto.ImagenText
            : "https://via.placeholder.com/300";

        card.innerHTML = `
            <img src="${imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="categoria">${producto.categoria_nombre ?? "Sin categoría"}</p>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio_venta}</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <p class="proveedor">Proveedor: ${producto.proveedor_nombre ?? "N/A"}</p>
        `;

        contenedor.appendChild(card);
    });
}
