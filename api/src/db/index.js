const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.DB_URL);

const DATABASE_NAME = process.env.DB_NAME;

connection.on("connected", async () => {
  console.info(`Database: ${DATABASE_NAME} - Conexión con la base de datos establecida`);
});

connection.on("reconnected", () => {
  console.info(`Database: ${DATABASE_NAME} -  Conexión con la base de datos restablecida`);
});

connection.on("disconnected", () => {
  console.warn(`Database: ${DATABASE_NAME} -  Conexión con la base de datos perdida`);
});

connection.on("close", () => {
  console.info(`Database: ${DATABASE_NAME} -  Conexión con la base de datos cerrada`);
});

connection.on("error", (error) => {
  console.error(`Database :${DATABASE_NAME} - Error intentando conectarse a la base de datos: `, { error });
});

module.exports = connection;
