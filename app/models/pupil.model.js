const sql = require("./db.js");

// constructor
const Pupil = function(Pupil) {
  this.id = Pupil.id;
  this.class_id = Pupil.class_id
  this.name = Pupil.name;
  this.age = Pupil.age;
  this.phone = Pupil.phone;
  this.login = Pupil.login;
  this.password = Pupil.password;
};


Pupil.loginUser = (login, password, result) => {
  sql.query(`SELECT * FROM pupil WHERE login = '${login}' AND password = '${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Pupil: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Pupil with the id
    result({ kind: "not_found" }, null);
  });
};

Pupil.getAll = result => {
  sql.query("SELECT * FROM pupil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pupils: ", res);
    result(null, res);
  });
};

Pupil.getAllByClass = (classId, result) => {
  sql.query(`SELECT * FROM pupil WHERE class_id = ${classId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pupils: ", res);
    result(null, res);
  });
};

module.exports = Pupil;
