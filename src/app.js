import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  const prodManager = new ProductManager();

  const limit = parseInt(req.query.limit);

  let sendProducts = async () => {
    const products = await prodManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.send({ products: limitedProducts });
    } else {
      res.send({ products });
    }
  };

  sendProducts();
});

app.get("/products/:id", (req, res) => {
  const paramId = req.params.id;

  const sendProduct = async () => {
    const prodManager = new ProductManager();
    const product = await prodManager.getProductById(paramId);
    res.send(product);
  };

  sendProduct();
});

app.listen(8080, () => console.log("Escuchando en el puerto 8080"));
