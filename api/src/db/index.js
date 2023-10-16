const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.DB_URL);

const DATABASE_NAME = process.env.DB_NAME;

connection.on("connected", async () => {
  console.info(`Database: ${DATABASE_NAME} - Connection established`);
});

connection.on("reconnected", () => {
  console.info(`Database: ${DATABASE_NAME} - Connection reestablished`);
});

connection.on("disconnected", () => {
  console.warn(`Database: ${DATABASE_NAME} - Connection lost`);
});

connection.on("close", () => {
  console.info(`Database: ${DATABASE_NAME} - Connection closed`);
});

connection.on("error", (error) => {
  console.error(`Database :${DATABASE_NAME} - Error connecting: `, { error });
});

module.exports = connection;
