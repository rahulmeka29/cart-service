const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
console.log(PORT)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Books application" });
});

require("./app/routes/cart.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});