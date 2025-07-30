# Sistema online para Librería ABC y Tienda Ropa

Este proyecto consiste en la creación de una **API con MongoDB** para una **librería** y una **tienda de ropa**, junto con un **frontend** que permite la gestión de usuarios, libros, prendas y ventas. El sistema completo ofrece operaciones CRUD, así como consultas avanzadas (reportes).

---

## 📚 Colecciones – Librería

### 👤 Usuarios
```json
{
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "supersegura123",
  "rol": "cliente",
  "fecha_creacion": "2025-05-14T00:13:32.275Z"
}

📘 Libros
{
  "titulo": "Rayuela",
  "autor": {
    "nombre": "Julio",
    "apellido": "Cortázar",
    "nacionalidad": "Argentina"
  },
  "precio": 18,
  "cantidad_stock": 12
}

🧾 Ventas
{
  "libro": {
    "titulo": "El Aleph"
  },
  "fecha_venta": "2025-05-11T00:00:00.000Z",
  "cantidad": 3,
  "total": 37.5,
  "usuario": {
    "username": "librera99"
  }
}


🧥 Colecciones – Tienda de Ropa
👕 Prendas
{
  "nombre": "Camiseta Oversize",
  "marca": "Nike",
  "talla": "L",
  "precio": 22.99,
  "stock": 15
}

👤 Usuarios
{
  "nombre": "María López",
  "email": "maria@example.com",
  "rol": "cliente"
}
