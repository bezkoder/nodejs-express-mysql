import express from "express";
import { TutorialDB } from "../models/tutorial.model.js";

// Create and Save a new Tutorial
export function create(req: express.Request, res: express.Response) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };

  // Save Tutorial in the database
  TutorialDB.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
}

// Retrieve all Tutorials from the database (with condition).
export function findAll(req: express.Request, res: express.Response) {
  const title = req.query.title as string;

  TutorialDB.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
}

// Find a single Tutorial by Id
export function findOne(req: express.Request, res: express.Response) {
  TutorialDB.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
}

// find all published Tutorials
export function findAllPublished(req: express.Request, res: express.Response) {
  TutorialDB.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
}

// Update a Tutorial identified by the id in the request
export function update(req: express.Request, res: express.Response) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  TutorialDB.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
}

// Delete a Tutorial with the specified id in the request
export function remove(req: express.Request, res: express.Response) {
  TutorialDB.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id,
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
}

// Delete all Tutorials from the database.
export function deleteAll(req: express.Request, res: express.Response) {
  TutorialDB.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
}
