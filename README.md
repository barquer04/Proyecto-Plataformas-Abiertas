# 🌸 Orchid Jewelry API & WebApp  

Proyecto desarrollado en el curso **Desarrollo de Plataformas Abiertas**.  
Estudiantes: **Astrid Mendoza** & **Mar Barquero** 🎓  

---

## 📖 Resumen  
Orchid Jewelry es una aplicación web con **API REST en Flask** y una **interfaz en HTML, CSS y JavaScript**, diseñada para la **gestión de productos de joyería**.  
El sistema permite:  
- Registrar productos.  
- Editarlos o eliminarlos.  
- Consultarlos desde una tabla dinámica.  
- Autenticación básica de usuarios (login).  

La interfaz gráfica combina diseño moderno con colores suaves inspirados en la **Guaria Morada** 🌸, la flor nacional de Costa Rica.  

---

## ⚙️ Tecnologías utilizadas  
- 🐍 **Flask (Python)** → Backend y API REST.  
- 🍃 **MongoDB** → Base de datos NoSQL para almacenar los productos.  
- 🎨 **HTML5, CSS3, JavaScript** → Frontend con estilos personalizados.  
- 📦 **Postman** → Pruebas de los endpoints de la API.  

---

## 🚀 Endpoints principales (API)  
👉 URL base: `http://127.0.0.1:5000/orchidjewerly/api/v1`  

### 🔑 Usuarios  
- **POST** `/usuarios/login` → Inicio de sesión.  

📌 Usuario de prueba ya registrado en la colección de usuarios:  
```json
{
  "username": "juanperez",
  "password": "supersegura123"
}
```  

### 💎 Productos  
- **GET** `/products` → Obtener todos los productos.  
- **GET** `/products/{id}` → Obtener un producto por ID.  
- **POST** `/products` → Crear producto.  
- **PUT** `/products/{id}` → Actualizar producto.  
- **DELETE** `/products/{id}` → Eliminar producto.  

---

## 🖥️ Funcionalidades de la interfaz  
- 📋 Formulario para agregar y editar productos.  
- 📊 Tabla interactiva con listado de productos.  
- 🗑️ Botones de acción: **Editar** y **Eliminar**.  
- ⚡ Actualización en tiempo real tras cada acción.  
- 🔔 Manejo de mensajes de carga y error.  

---

## 📂 Estructura del proyecto  
- **Backend** → Carpeta de la API en Flask.  
- **Frontend** → Archivos HTML, CSS y JS.  
- **Postman Collection** → Archivo `.json` para probar los endpoints.  

---

## 🌟 Puntos importantes  
- Se aplicó el concepto de **desarrollo en capas** (backend y frontend separados).  
- Diseño responsivo y minimalista 🎨.  
- Conexión con MongoDB para almacenamiento real.  
- Proyecto completo listo para despliegue o mejoras futuras (ej. autenticación avanzada, imágenes de productos, etc.).  

---

## 👩‍💻 Autores  
✨ **Astrid Mendoza**  
✨ **Mar Barquero**  
