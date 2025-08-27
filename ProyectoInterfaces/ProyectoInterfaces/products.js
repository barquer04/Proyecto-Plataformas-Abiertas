// Variables
let productoEditandoId = null;
const API_BASE = "http://127.0.0.1:5000/orchidjewerly/api/v1";

// Obtener datos del formulario
function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value) || 0,
        stock: parseInt(document.getElementById("stock").value, 10) || 0,
        categoria: document.getElementById("categoria").value,
        imagen: document.getElementById("imagen") ? document.getElementById("imagen").value : ""
    };
}

// Limpiar formulario y estado
function limpiarFormulario() {
    document.getElementById("form-producto").reset();
    productoEditandoId = null;
    document.querySelector('#form-producto button[type="submit"]').textContent = "Agregar producto";
    document.getElementById("cancelar-edicion").style.display = "none";
}

// Guardar producto (crear o actualizar)
function guardarProducto(data, id = null) {
    const url = id ? `${API_BASE}/products/${id}` : `${API_BASE}/products`;
    const method = id ? "PUT" : "POST";

    return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error ${res.status}: ${text}`);
        }
        return res.json();
    });
}

// Cargar productos
function cargarProductos() {
    fetch(`${API_BASE}/products`)
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }
            return res.json();
        })
        .then((productos) => {
            const tbody = document.querySelector("#tabla-productos tbody");
            tbody.innerHTML = "";
            productos.forEach((producto) => {
                // Asegurar ID correcto
                const id = producto._id?.$oid ?? producto._id ?? "";

                // Asegurar valores numéricos
                const precio = producto.precio !== undefined ? parseFloat(producto.precio) : 0;
                const stock = producto.stock !== undefined ? parseInt(producto.stock) : 0;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${producto.nombre ?? ""}</td>
                    <td>${producto.descripcion ?? ""}</td>
                    <td>$${precio.toFixed(2)}</td>
                    <td>${stock}</td>
                    <td>${producto.categoria ?? ""}</td>
                    <td>
                        <button onclick="editarProducto('${id}')">Editar</button>
                        <button onclick="eliminarProducto('${id}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            // Mostrar la tabla si estaba oculta
            const tabla = document.getElementById("tabla-productos");
            if (tabla) tabla.style.display = "";
        })
        .catch((err) => {
            console.error("Error al cargar los productos:", err);
            alert("Error al cargar los productos: " + err.message);
        });
}

// Editar producto
function editarProducto(id) {
    fetch(`${API_BASE}/products/${id}`)
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }
            return res.json();
        })
        .then((producto) => {
            document.getElementById("nombre").value = producto.nombre ?? "";
            document.getElementById("descripcion").value = producto.descripcion ?? "";
            document.getElementById("precio").value = producto.precio ?? "";
            document.getElementById("stock").value = producto.stock ?? "";
            document.getElementById("categoria").value = producto.categoria ?? "";
            if (document.getElementById("imagen")) {
                document.getElementById("imagen").value = producto.imagen ?? "";
            }

            productoEditandoId = producto._id?.$oid ?? producto._id ?? null;
            document.querySelector('#form-producto button[type="submit"]').textContent = "Actualizar producto";
            document.getElementById("cancelar-edicion").style.display = "inline-block";
        })
        .catch((err) => {
            console.error("Error al cargar el producto:", err);
            alert("Error al cargar el producto: " + err.message);
        });
}

// Eliminar producto
function eliminarProducto(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
    })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }
            return res.json();
        })
        .then((json) => {
            alert(json.mensaje || "Producto eliminado");
            cargarProductos();
        })
        .catch((err) => {
            console.error("Error al eliminar:", err);
            alert("Error al eliminar: " + err.message);
        });
}

// Cancelar edición
document.getElementById("cancelar-edicion").addEventListener("click", limpiarFormulario);

// Evento submit del formulario
document.getElementById("form-producto").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = obtenerDatosFormulario();
    guardarProducto(data, productoEditandoId)
        .then((json) => {
            alert(json.mensaje || "Operación realizada");
            limpiarFormulario();
            cargarProductos();
        })
        .catch((err) => {
            console.error("Error al guardar:", err);
            alert("Error al guardar: " + err.message);
        });
});

// Inicial
cargarProductos();
