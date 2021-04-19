const Announcement = require("../models/announcement.model.js");

// Find Announcement by schooldId
exports.findBySchoolId = (req, res) => {
  Announcement.getBySchool(req.params.schooldId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Announcement with schooldId ${req.params.schooldId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Announcement with schooldId " + req.params.schooldId
        });
      }
    } else res.send(data);
  });
};