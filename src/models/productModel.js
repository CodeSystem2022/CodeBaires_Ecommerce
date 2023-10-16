const mongoose = require("mongoose");
const connection = require("../db");

const ProductSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  imagen: String,
  categoria: {
    nombre: String,
    id: String,
  },
  precio: Number,
});

const Product = connection.model("Product", ProductSchema);

module.exports = Product;
