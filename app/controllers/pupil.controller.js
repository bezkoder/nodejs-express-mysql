const Pupil = require("../models/pupil.model.js");

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

// Find Pupils by ClassId
exports.findByClass = (req, res) => {
  Pupil.getAllByClass(req.params.classId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pupils with classId ${req.params.classId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pupils with classId " + req.params.classId
        });
      }
    } else res.send(data);
  });
};