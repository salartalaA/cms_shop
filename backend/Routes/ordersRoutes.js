const express = require("express");
const CMS = require("../db/CMS");

const ordersRouter = express.Router();

//routes

ordersRouter.get("/", (req, res) => {
  let selectAllOrdersQuery = `SELECT orders.id, orders.date, orders.hour, orders.price, orders.off, orders.sale, orders.popularity, orders.count, orders.sale_count, orders.isAccept, orders.isChecked, users.firstname as userID, products.title as productID FROM orders INNER JOIN users ON users.id = orders.userID INNER JOIN products ON products.id = orders.productID`;
  CMS.query(selectAllOrdersQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.delete("/:orderID", (req, res) => {
  let orderID = req.params.orderID;
  let deleteOrderQuery = `DELETE FROM orders WHERE id = ${orderID}`;
  CMS.query(deleteOrderQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.put("/:orderID/:isAccept", (req, res) => {
  let orderID = req.params.orderID;
  let isAccept = req.params.isAccept;
  let updateIsAcceptQuery = `Update orders SET isAccept = "${isAccept}" WHERE id = ${orderID} `;
  CMS.query(updateIsAcceptQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.put("/check/:orderID/:isChecked", (req, res) => {
  let orderID = req.params.orderID;
  let isChecked = req.params.isChecked;
  let updateIsAcceptQuery = `Update orders SET isChecked = "${isChecked}" WHERE id = ${orderID} `;
  CMS.query(updateIsAcceptQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = ordersRouter;
