const sql = require("./db.js");

// constructor
const Teacher = function(Teacher) {
  this.id = Teacher.id;
  this.school_id = Teacher.school_id
  this.name = Teacher.name;
  this.phone = Teacher.phone;
  this.gender = Teacher.gender;
  this.education = Teacher.education;
  this.experience = Teacher.experience;
};


Teacher.getByClass = (classId, result) => {
  sql.query(`SELECT t.* FROM teacher t, class c WHERE t.id = c.form_master AND c.id = ${classId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("teachers: ", res);
    result(null, res);
  });
};

module.exports = Teacher;
