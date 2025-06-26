use tiendaropa;

// Colección: usuarios
db.usuarios.insertMany([
  {
    "nombre": "Laura Gómez",
    "correo": "laura.gomez@gmail.com",
    "direccion": "San José, Costa Rica",
    "telefono": "8888-1234"
  },
  {
    "nombre": "Carlos Pérez",
    "correo": "carlos.perez@gmail.com",
    "direccion": "Heredia, Costa Rica",
    "telefono": "8999-0000"
  }
]);

// Colección: marcas
db.marcas.insertMany([
  {
    "nombre": "UrbanStyle",
    "pais_origen": "USA"
  },
  {
    "nombre": "EcoModa",
    "pais_origen": "México"
  }
]);

// Colección: prendas
db.prendas.insertMany([
  {
    "nombre": "Camiseta Oversize",
    "marca": "UrbanStyle",
    "precio": 15000,
    "stock": 20,
    "talla": "M",
    "tipo": "Camiseta"
  },
  {
    "nombre": "Vestido Floral",
    "marca": "UrbanStyle",
    "precio": 35000,
    "stock": 8,
    "talla": "S",
    "tipo": "Vestido"
  }
]);

// Colección: ventas
db.ventas.insertMany([
  {
    "usuario": "Laura Gómez",
    "prenda": "Camiseta Oversize",
    "marca": "UrbanStyle",
    "cantidad": 3,
    "fecha": new Date("2024-06-15T00:00:00Z")
  },
  {
    "usuario": "Laura Gómez",
    "prenda": "Vestido Floral",
    "marca": "UrbanStyle",
    "cantidad": 1,
    "fecha": new Date("2024-06-15T00:00:00Z")
  }
]);

// Consultas para reportes

// Consultar cantidad de unidades vendidas por prenda en una fecha específica
db.ventas.aggregate([
  {
    $match: {
      "fecha": new Date("2024-06-15T00:00:00Z")
    }
  },
  {
    $group: {
      "_id": "$prenda",
      "totalVendidas": { $sum: "$cantidad" }
    }
  }
]);

// Obtener todas las marcas que han registrado al menos una venta
db.ventas.distinct("marca");

// Mostrar prendas vendidas y su stock restante
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
      "_id": "$prenda",
      "totalVendidas": { $sum: "$cantidad" },
      "stockActual": { $first: "$info_prenda.stock" }
    }
  }
]);

// Mostrar las 5 marcas con mayor cantidad de prendas vendidas
db.ventas.aggregate([
  {
    $group: {
      "_id": "$marca",
      "totalVentas": { $sum: "$cantidad" }
    }
  },
  { $sort: { "totalVentas": -1 } },
  { $limit: 5 }
]);
