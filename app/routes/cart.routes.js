module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/create", cart.create);
    router.get("/fetch", cart.fetch)
    router.put("/update", cart.update)
    // Create a new Tutorial
    app.use("/api/cart", router);
  };