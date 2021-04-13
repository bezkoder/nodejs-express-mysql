const Achievement = require("../models/achievement.model.js");

// Create and Save a new Achievement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Achievement
  const achievement = new Achievement({
    pupil_id: req.body.pupil_id,
    name: req.body.name,
    date: req.body.date,
    type: req.body.type
  });

  // Save Achievement in the database
  Achievement.create(achievement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Achievement."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Achievement.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving achievements."
      });
    else res.send(data);
  });
};

// Find a single Achievement with pupilId
exports.findByParent = (req, res) => {
  Achievement.findByPupilId(req.params.pupilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Achievement with id ${req.params.pupilId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Achievement with id " + req.params.pupilId
        });
      }
    } else res.send(data);
  });
};

// Update a Achievement identified by the achievementId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Achievement.updateById(
    req.params.achievementId,
    new Achievement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Achievement with id ${req.params.achievementId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Achievement with id " + req.params.achievementId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Achievement with the specified achievementId in the request
exports.delete = (req, res) => {
  Achievement.remove(req.params.achievementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Achievement with id ${req.params.achievementId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Achievement with id " + req.params.achievementId
        });
      }
    } else res.send({ message: `Achievement was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Achievement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all achievements."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
