const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.DB_URL);

const DATABASE_NAME = process.env.DB_NAME;

connection.on("connected", async () => {
  console.info(`Database: ${DATABASE_NAME} - Se estableció la conexión con la base de datos`);
});

connection.on("reconnected", () => {
  console.info(`Database: ${DATABASE_NAME} - Se restableció la conexión con la base de datos`);
});

connection.on("disconnected", () => {
  console.warn(`Database: ${DATABASE_NAME} - Se perdió la conexión con la base de datos`);
});

connection.on("close", () => {
  console.info(`Database: ${DATABASE_NAME} - Se cerró la conexión con la base de datos`);
});

connection.on("error", (error) => {
  console.error(`Database :${DATABASE_NAME} - Error conectándose con la base de datos: `, { error });
});

module.exports = connection;
