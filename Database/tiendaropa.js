// Seleccionar o crear la base de datos de la tienda
use tiendaropa;

// ------------------------
// Colección: usuarios
// ------------------------

db.usuarios.insertOne({
  nombre: "Laura Gómez",
  correo: "laura.gomez@gmail.com",
  direccion: "San José, Costa Rica",
  telefono: "8888-1234"
})

db.usuarios.insertMany([
  {
    nombre: "Carlos Pérez",
    correo: "carlos.perez@gmail.com",
    direccion: "Heredia, Costa Rica",
    telefono: "8999-4567"
  },
  {
    nombre: "Ana Ruiz",
    correo: "ana.ruiz@hotmail.com",
    direccion: "Cartago, Costa Rica",
    telefono: "8777-6543"
  }
])

db.usuarios.updateOne(
  { nombre: "Carlos Pérez" },
  { $set: { telefono: "8999-0000" } }
)

db.usuarios.deleteOne({ nombre: "Ana Ruiz" })

// ------------------------
// Colección: marcas
// ------------------------

db.marcas.insertOne({
  nombre: "UrbanStyle",
  pais_origen: "USA"
})

db.marcas.insertMany([
  {
    nombre: "EcoModa",
    pais_origen: "Colombia"
  },
  {
    nombre: "TrendyFit",
    pais_origen: "España"
  }
])

db.marcas.updateOne(
  { nombre: "EcoModa" },
  { $set: { pais_origen: "México" } }
)

db.marcas.deleteOne({ nombre: "TrendyFit" })

// ------------------------
// Colección: prendas
// ------------------------

db.prendas.insertOne({
  nombre: "Camiseta Oversize",
  marca: "UrbanStyle",
  precio: 15000,
  stock: 20,
  talla: "M",
  tipo: "Camiseta"
})

db.prendas.insertMany([
  {
    nombre: "Pantalón Cargo",
    marca: "EcoModa",
    precio: 25000,
    stock: 10,
    talla: "L",
    tipo: "Pantalón"
  },
  {
    nombre: "Vestido Floral",
    marca: "UrbanStyle",
    precio: 35000,
    stock: 5,
    talla: "S",
    tipo: "Vestido"
  }
])

db.prendas.updateOne(
  { nombre: "Vestido Floral" },
  { $set: { stock: 8 } }
)

db.prendas.deleteOne({ nombre: "Pantalón Cargo" })

// ------------------------
// Colección: ventas
// ------------------------

db.ventas.insertMany([
  {
    usuario: "Laura Gómez",
    prenda: "Camiseta Oversize",
    marca: "UrbanStyle",
    cantidad: 2,
    fecha: new Date("2024-06-15T00:00:00Z")
  },
  {
    usuario: "Carlos Pérez",
    prenda: "Vestido Floral",
    marca: "UrbanStyle",
    cantidad: 1,
    fecha: new Date("2024-06-18T00:00:00Z")
  },
  {
    usuario: "Laura Gómez",
    prenda: "Vestido Floral",
    marca: "UrbanStyle",
    cantidad: 1,
    fecha: new Date("2024-06-15T00:00:00Z")
  }
])

db.ventas.updateOne(
  { prenda: "Camiseta Oversize" },
  { $set: { cantidad: 3 } }
)

db.ventas.deleteOne({ usuario: "Carlos Pérez", prenda: "Vestido Floral" })

// ------------------------
// Consultas
// ------------------------

// Esta consulta me permite saber cuántas unidades se vendieron por prenda en una fecha específica
db.ventas.aggregate([
  { $match: { fecha: new Date("2024-06-15T00:00:00Z") } },
  { $group: { _id: "$prenda", totalVendidas: { $sum: "$cantidad" } } }
])

// Aquí obtengo todas las marcas que han registrado al menos una venta
db.ventas.distinct("marca")

// Quise relacionar ventas con la colección de prendas para mostrar lo vendido y el stock restante
db.ventas.aggregate([
  {
    $lookup: {
      from: "prendas",
      localField: "prenda",
      foreignField: "nombre",
      as: "info_prenda"
    }
  },
  { $unwind: "$info_prenda" },
  {
    $group: {
      _id: "$prenda",
      totalVendidas: { $sum: "$cantidad" },
      stockActual: { $first: "$info_prenda.stock" }
    }
  }
])

// Con esta agregación muestro las 5 marcas con mayor cantidad de prendas vendidas
db.ventas.aggregate([
  { $group: { _id: "$marca", totalVentas: { $sum: "$cantidad" } } },
  { $sort: { totalVentas: -1 } },
  { $limit: 5 }
])
