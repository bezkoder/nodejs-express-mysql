const sql = require("./db.js");

// constructor
const Pupil = function(Pupil) {
  this.id = Pupil.id;
  this.class_id = Pupil.class_id
  this.name = Pupil.name;
  this.age = Pupil.age;
  this.parent_phone = Pupil.parent_phone;
};

Pupil.create = (newPupil, result) => {
  sql.query("INSERT INTO Pupils SET ?", newPupil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Pupil: ", { id: res.insertId, ...newPupil });
    result(null, { id: res.insertId, ...newPupil });
  });
};

Pupil.findById = (PupilId, result) => {
  sql.query(`SELECT * FROM Pupils WHERE id = ${PupilId}`, (err, res) => {
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

Pupil.updateById = (id, Pupil, result) => {
  sql.query(
    "UPDATE Pupils SET email = ?, name = ?, active = ? WHERE id = ?",
    [Pupil.email, Pupil.name, Pupil.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pupil with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Pupil: ", { id: id, ...Pupil });
      result(null, { id: id, ...Pupil });
    }
  );
};

Pupil.remove = (id, result) => {
  sql.query("DELETE FROM Pupils WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pupil with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Pupil with id: ", id);
    result(null, res);
  });
};

Pupil.removeAll = result => {
  sql.query("DELETE FROM Pupils", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Pupils`);
    result(null, res);
  });
};

module.exports = Pupil;
