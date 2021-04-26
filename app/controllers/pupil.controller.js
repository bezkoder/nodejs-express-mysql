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
exports.loginStudent = (req, res) => {
  Pupil.loginUser(req.body.login, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pupil with login ${req.body.login} and password ${req.body.password}`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pupil with login " + req.body.login
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