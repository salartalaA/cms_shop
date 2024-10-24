const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsRouter = require("./Routes/productsRoutes");
const commentsRouter = require("./Routes/commentsRoutes");
const usersRouter = require("./Routes/usersRoutes");
const ordersRouter = require("./Routes/ordersRoutes");
const offsRouter = require("./Routes/offsRoutes");
const adminsRouter = require("./Routes/adminsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/offs", offsRouter);
app.use("/api/admins", adminsRouter);

app.listen(4000);
