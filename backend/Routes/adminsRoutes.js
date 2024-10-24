const express = require("express");
const CMS = require("../db/CMS");

const adminsRouter = express.Router();

//routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;
  let selectMainAdminQuery = `SELECT * FROM admins WHERE token = "${adminToken}"`;
  CMS.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
