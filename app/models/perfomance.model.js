const sql = require("./db.js");

// constructor
const Perfomance = function(Perfomance) {
  this.id = Perfomance.id;
  this.pupil_id = Perfomance.pupil_id
  this.subject_id = Perfomance.subject_id;
  this.average_score = Perfomance.average_score;
  this.name = Perfomance.name;
};


Perfomance.getByPupil = (pupilId, result) => {
  sql.query(`SELECT a.*, s.name FROM academic_perfomance a, subject s WHERE a.subject_id = s.id AND a.pupil_id = ${pupilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("perfomance: ", res);
    result(null, res);
  });
};

module.exports = Perfomance;
