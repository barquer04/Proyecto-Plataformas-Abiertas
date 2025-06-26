# 🗄️ Base de datos de Tienda de Ropa

---

## 📝 Descripción breve

Base de datos sencilla diseñada y adaptada para un sistema en línea de una tienda de ropa, capaz de administrar la información de manera efectiva y realista. Se incluyen colecciones para usuarios, marcas, prendas y ventas, con ejemplos de inserciones, actualizaciones, eliminaciones y consultas MongoDB.

---

## 📋 Partes y estructura de la base de datos

### 👥 Usuarios

Ejemplo de documento en la colección `usuarios`:

```json
{
  "nombre": "Laura Gómez",
  "correo": "laura.gomez@gmail.com",
  "direccion": "San José, Costa Rica",
  "telefono": "8888-1234"
}
```
### 🏷️ Marcas
 
```json
{
  "nombre": "UrbanStyle",
  "pais_origen": "USA"
}
```
### 👚 Prendas
 
```json
{
  "nombre": "Camiseta Oversize",
  "marca": "UrbanStyle",
  "precio": 15000,
  "stock": 20,
  "talla": "M",
  "tipo": "Camiseta"
}
```
### 💰 Ventas
```json
  {
    "usuario": "Laura Gómez",
    "prenda": "Camiseta Oversize",
    "marca": "UrbanStyle",
    "cantidad": 2,
    "fecha": "2024-06-15T00:00:00Z"
  },
  {
    "usuario": "Carlos Pérez",
    "prenda": "Vestido Floral",
    "marca": "UrbanStyle",
    "cantidad": 1,
    "fecha": "2024-06-18T00:00:00Z"
  }
  ```
 
***
 
## 👤 Integrante:
- Mar Barquero y Astrid Mendoza 
