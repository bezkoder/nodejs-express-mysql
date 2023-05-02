import express from "express";
import { Database } from "../db/db.interface";
import { TutorialSqlDB } from "../db/sql";

export class TutorialController {
  db: Database = new TutorialSqlDB();

  create(req: express.Request, res: express.Response) {
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
    this.db.create(tutorial, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      else res.send(data);
    });
  }

  findAll(req: express.Request, res: express.Response) {
    const title = req.query.title as string;

    this.db.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      else res.send(data);
    });
  }

  findOne(req: express.Request, res: express.Response) {
    this.db.findById(req.params.id, (err, data) => {
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

  findAllPublished(req: express.Request, res: express.Response) {
    this.db.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      else res.send(data);
    });
  }

  update(req: express.Request, res: express.Response) {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    this.db.updateById(req.params.id, req.body, (err, data) => {
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

  remove(req: express.Request, res: express.Response) {
    this.db.remove(req.params.id, (err, data) => {
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

  deleteAll(req: express.Request, res: express.Response) {
    this.db.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  }
}
