const express = require("express");
const CMS = require("../db/CMS");

const usersRouter = express.Router();

//routes

usersRouter.get("/", (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM users`;
  CMS.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.delete("/:userID", (req, res) => {
  let userID = req.params.userID;
  let deleteUserQuery = `DELETE FROM users WHERE id = ${userID}`;
  CMS.query(deleteUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.put("/:userID", (req, res) => {
  let body = req.body;
  let userID = req.params.userID;
  let editUserQuery = `UPDATE users SET firstname = "${body.firstname}", lastname = "${body.lastname}", username = "${body.username}", password = "${body.password}", phone = "${body.phone}", city = "${body.city}", email = "${body.email}", address = "${body.address}", score = "${body.score}", buy = "${body.buy}" WHERE id = ${userID}`;
  CMS.query(editUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

// usersRouter.post("/", (req, res) => {
//   let body = req.body;
//   let addNewUserQuery = `INSERT INTO VALUES (NULL, ${body.firstname}, ${body.lastname}, ${body.username}, ${body.password}, ${body.phone}, ${body.city}, ${body.email}, ${body.address}, ${body.score}, ${body.buy})`;
//   CMS.query(addNewUserQuery, (err, result) => {
//     if (err) {
//       res.send(null);
//     } else {
//       res.send(result);
//     }
//   });
// });

module.exports = usersRouter;
