require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const { getProducts } = require("./src/services/productService");

mercadopago.configure({
  access_token: "APP_USR-2627316415575972-102917-6b1926269037590c4e01508a8e8b16de-1513494519",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/products", async function (_req, res) {
  const products = await getProducts();
  res.json(products);
});

app.post("/api/create_preference", (req, res) => {
  const { description, price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: description,
        unit_price: Number(price),
        quantity: Number(quantity),
      },
    ],
    back_urls: {
      success: process.env.BASE_URL,
      failure: process.env.BASE_URL,
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/api/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = app;
