const mysql = require("mysql");

const CMS = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cms_shop",
});

module.exports = CMS;
