const Products = require("../models/productModel");

exports.getProducts = async () => {
  const products = await Products.find();
  return JSON.parse(JSON.stringify(products));
};
