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
  sql.query(`SELECT p.*, c.parallel, c.form_master, c.letter, c.specialization, s.id as school_id ,s.name as school_name, s.address as school_address, s.phone as school_phone FROM pupil p, class c, school s WHERE login = '${login}' AND password = '${password}' AND p.class_id = c.id AND c.school_id = s.id`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Pupil: ", res[0]);
      result(null, {
        id: res[0].id,
        name: res[0].name,
        age: res[0].age,
        phone: res[0].phone,
        school_class: {
          id: res[0].class_id,
          parallel: res[0].parallel,
          form_master: res[0].form_master,
          letter: res[0].letter
        },
        school: {
          name: res[0].school_name,
          address: res[0].school_address,
          phone: res[0].school_phone
        }
      });
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
