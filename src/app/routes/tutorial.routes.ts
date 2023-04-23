import * as express from "express";

export function setRouter(x: express.Application) {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = express.Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.remove);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  x.use("/api/tutorials", router);
}
