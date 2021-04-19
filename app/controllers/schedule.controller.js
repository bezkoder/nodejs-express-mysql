const Schedule = require("../models/schedule.model.js");

// Find Schedule by ClassId
exports.findByClass = (req, res) => {
  Schedule.getByClass(req.params.classId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule with classId ${req.params.classId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule with classId " + req.params.classId
        });
      }
    } else res.send(data);
  });
};