const Pupil = require("../models/pupil.model.js");

// Create and Save a new Pupil
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pupil
  const pupil = new Pupil({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Pupil in the database
  Pupil.create(pupil, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pupil."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Pupil.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pupils."
      });
    else res.send(data);
  });
};

// Find a single Pupil with a pupilId
exports.findOne = (req, res) => {
  Pupil.findById(req.params.pupilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pupil with id ${req.params.pupilId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pupil with id " + req.params.pupilId
        });
      }
    } else res.send(data);
  });
};

// Update a Pupil identified by the pupilId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pupil.updateById(
    req.params.pupilId,
    new Pupil(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pupil with id ${req.params.pupilId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pupil with id " + req.params.pupilId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pupil with the specified pupilId in the request
exports.delete = (req, res) => {
  Pupil.remove(req.params.pupilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pupil with id ${req.params.pupilId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pupil with id " + req.params.pupilId
        });
      }
    } else res.send({ message: `Pupil was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Pupil.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pupils."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
