const sql = require("./db.js");

// constructor
const Schedule = function(Schedule) {
  this.id = Schedule.id;
  this.class_id = Schedule.class_id
  this.day = Schedule.day;
  this.time = Schedule.time;
  this.name = Schedule.name;
};


Schedule.getByClass = (classId, result) => {
  sql.query(`SELECT s.*, su.name FROM subject_in_schedule s, subject su WHERE s.subject_id = su.id AND s.class_id = ${classId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("schedule: ", res);
    result(null, res);
  });
};

module.exports = Schedule;
