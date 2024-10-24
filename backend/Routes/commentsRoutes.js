const express = require("express");
const CMS = require("../db/CMS");

const commentsRouter = express.Router();

//routes

commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT comments.id, comments.isAccept, comments.body, comments.date, comments.hour, users.firstname as userID, products.title as productID, isReplay, replayid, isAccept FROM comments INNER JOIN users ON users.id = comments.userID INNER JOIN products ON products.id = comments.productID`;
  CMS.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.get("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let selectMainCommentQuery = `SELECT comments.id, comments.isAccept, comments.body, comments.date, comments.hour, users.firstname as userID, products.title as productID, isReplay, replayid, isAccept FROM comments INNER JOIN users ON users.id = comments.userID INNER JOIN products ON products.id = comments.productID WHERE comments.id = ${commentID}`;
  CMS.query(selectMainCommentQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// commentsRouter.get("/main/:commentID", (req, res) => {
//   let commentID = req.params.commentID;
//   let selectMainCommentQuery2 = `SELECT * FROM comments WHERE id = ${commentID}`;
//   CMS.query(selectMainCommentQuery2, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

commentsRouter.get("/replay/:replayID", (req, res) => {
  let replayID = req.params.replayID;
  let selectMainAnswerQuery = `SELECT * FROM comments WHERE replayid = ${replayID}`;
  CMS.query(selectMainAnswerQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/replay/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let body = req.body;
  let replayQuery = `INSERT INTO comments VALUES (NULL, "${body.body}", comments.date, comments.hour, "${body.userID}", "${body.productID}", 1, "${commentID}", 1)`;
  CMS.query(replayQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let deleteCommentQuery = `DELETE FROM comments WHERE id = ${commentID}`;
  CMS.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let editCommentQuery = `UPDATE comments SET body = "${req.body.body}" WHERE id = ${commentID}`;
  CMS.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID/:isAccept", (req, res) => {
  let commentID = req.params.commentID;
  let isAccept = req.params.isAccept;
  let updateIsAcceptQuery = `Update comments SET isAccept = "${isAccept}" WHERE id = ${commentID} `;
  CMS.query(updateIsAcceptQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = commentsRouter;
