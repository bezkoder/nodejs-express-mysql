const Teacher = require("../models/teacher.model.js");

// Find Teachers by ClassId
exports.findByClass = (req, res) => {
  Teacher.getByClass(req.params.classId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teachers with classId ${req.params.classId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teachers with classId " + req.params.classId
        });
      }
    } else res.send(data);
  });
};