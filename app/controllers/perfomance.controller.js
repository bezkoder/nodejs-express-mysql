const Perfomance = require("../models/perfomance.model.js");

// Find Perfomance by pupilId
exports.findByPupilId = (req, res) => {
  Perfomance.getByPupil(req.params.pupilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Perfomance with pupilId ${req.params.pupilId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Perfomance with pupilId " + req.params.pupilId
        });
      }
    } else res.send(data);
  });
};