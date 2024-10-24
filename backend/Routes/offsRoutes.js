const express = require("express");
const CMS = require("../db/CMS");

const offsRouter = express.Router();

//routes

offsRouter.get("/", (req, res) => {
  let selectAllOffsQuery = `SELECT offs.id, offs.code, offs.date, offs.isAccept, offs.percent, admins.firstname as adminID, products.title as productID FROM offs INNER JOIN admins on admins.id = offs.adminID INNER JOIN products on products.id = offs.productID`;
  CMS.query(selectAllOffsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

offsRouter.delete("/:offID", (req, res) => {
  let offID = req.params.offID;
  let deleteOffQuery = `DELETE FROM offs WHERE id = ${offID}`;
  CMS.query(deleteOffQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

// offsRouter.put("/active-off/:offID/:isActive", (req, res) => {
//   let offID = req.params.offID;
//   let isActive = req.params.isActive;
//   let putOffQuery = `UPDATE offs SET isActive = ${isActive} WHERE id = ${offID}`;
//   CMS.query(putOffQuery, (err, result) => {
//     if (err) {
//       res.send(null);
//     } else {
//       res.send(result);
//     }
//   });
// });

offsRouter.put("/:offID/:isAccept", (req, res) => {
  let offID = req.params.offID;
  let isAccept = req.params.isAccept;
  let updateIsAcceptQuery = `UPDATE offs SET isAccept = "${isAccept}" WHERE id = ${offID} `;
  CMS.query(updateIsAcceptQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = offsRouter;
