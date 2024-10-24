const express = require("express");
const CMS = require("../db/CMS");

const productsRouter = express.Router();

//routes

productsRouter.get("/", (req, res) => {
  let selectAllProductsQuery = `SELECT * FROM products`;
  CMS.query(selectAllProductsQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// productsRouter.get("/:productID", (req, res) => {
//   let productID = req.params.productID;
//   let selectedProductQuery = `SELECT * FROM products WHERE id = ${productID}`;
//   CMS.query(selectedProductQuery, (err, result) => {
//     if (err) {
//       res.send(null);
//     } else {
//       res.send(result);
//     }
//   });
// });

productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;
  let deleteProductQuery = `DELETE FROM products WHERE id = ${productID}`;

  CMS.query(deleteProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.put("/:productID", (req, res) => {
  let body = req.body;
  let productID = req.params.productID;

  let updateProductQuery = `UPDATE products SET title = "${body.title}", price = ${body.price}, count = ${body.count}, img = "${body.img}", popularity = ${body.popularity}, sale = ${body.sale}, colors = ${body.colors} WHERE id  = ${productID}`;
  CMS.query(updateProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.post("/", (req, res) => {
  let body = req.body;
  let addNewProductQuery = `INSERT INTO products VALUES (NULL, "${body.title}", "${body.price}", "${body.count}", "${body.img}", "${body.popularity}", "${body.sale}", "${body.colors}")`;
  CMS.query(addNewProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = productsRouter;
