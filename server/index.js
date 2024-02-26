const express = require("express");
const app = express();
const cors = require("cors"); //Use cors middleware to handle cross-domain(port3000 and port3001) requests.

app.use(express.json());
app.use(cors()); //Use cors middleware to handle cross-domain(port3000 and port3001) requests.
const db = require("./models");

//Routers
const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

const ratingsRouter = require("./routes/ratings");
app.use("/ratings", ratingsRouter);

const product_rentalsRouter = require("./routes/product_rentals");
app.use("/product_rentals", product_rentalsRouter);

const product_savesRouter = require("./routes/product_saves");
app.use("/product_saves", product_savesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
