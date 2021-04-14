const Olympiad = require("../models/olympiad.model.js");

// Create and Save a new Olympiad
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Olympiad
  const olympiad = new Olympiad({
    pupil_id: req.body.pupil_id,
    subject_id: req.body.subject_id,
    name: req.body.name,
    date: req.body.date,
    type: req.body.type
  });

  // Save Olympiad in the database
  Olympiad.create(olympiad, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Olympiad."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Olympiad.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving olympiads."
      });
    else res.send(data);
  });
};

// Find a single Olympiad with pupilId
exports.findByParent = (req, res) => {
  Olympiad.findByPupilId(req.params.pupilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Olympiad with id ${req.params.pupilId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Olympiad with id " + req.params.pupilId
        });
      }
    } else res.send(data);
  });
};

// Update a Olympiad identified by the olympiadId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Olympiad.updateById(
    req.params.olympiadId,
    new Olympiad(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Olympiad with id ${req.params.olympiadId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Olympiad with id " + req.params.olympiadId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Olympiad with the specified olympiadId in the request
exports.delete = (req, res) => {
  Olympiad.remove(req.params.olympiadId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Olympiad with id ${req.params.olympiadId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Olympiad with id " + req.params.olympiadId
        });
      }
    } else res.send({ message: `Olympiad was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Olympiad.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all olympiads."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
