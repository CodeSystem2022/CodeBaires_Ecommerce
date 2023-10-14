const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");
require('dotenv').config()

mercadopago.configure({
	access_token: "TEST-2559386050472488-091712-1d0b77b2997029e6d625b24bd8d90198-78655666",
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get("/", function () {
    path.resolve(__dirname, "..", "public"), "carrito.html";
});


app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": process.env.BASE_URL,
			"failure": process.env.BASE_URL,
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences
	.create(preference)
	.then(function (response) {
		res.json({
			id: response.body.id
		});
	})
	.catch(function (error) {
		console.log(error);
	});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(3030, () => {
	console.log("The server is now running on Port 3030");
});