const sql = require("./db.js");

// constructor
const Olympiad = function(Olympiad) {
  this.id = Olympiad.id;
  this.pupil_id = Olympiad.pupil_id
  this.name = Olympiad.name;
  this.date = Olympiad.date;
  this.type = Olympiad.type;
};

Olympiad.create = (newPupil, result) => {
  sql.query("INSERT INTO olympiad SET ?", newPupil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Olympiad: ", { id: res.insertId, ...newPupil });
    result(null, { id: res.insertId, ...newPupil });
  });
};

Olympiad.findByPupilId = (pupilId, result) => {
  sql.query(`SELECT o.*, s.name as subject_name FROM olympiad o, subject s WHERE pupil_id = ${pupilId} AND o.subject_id = s.id`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Olympiads: ", res);
      result(null, res);
      return;
    }

    // not found Olympiad with the id
    result({ kind: "not_found" }, null);
  });
};

Olympiad.getAll = result => {
  sql.query("SELECT * FROM olympiad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("olympiads: ", res);
    result(null, res);
  });
};

Olympiad.updateById = (id, Olympiad, result) => {
  sql.query(
    "UPDATE olympiad SET email = ?, name = ?, active = ? WHERE id = ?",
    [Olympiad.email, Olympiad.name, Olympiad.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Olympiad with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Olympiad: ", { id: id, ...Olympiad });
      result(null, { id: id, ...Olympiad });
    }
  );
};

Olympiad.remove = (id, result) => {
  sql.query("DELETE FROM olympiad WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Olympiad with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Olympiad with id: ", id);
    result(null, res);
  });
};

Olympiad.removeAll = result => {
  sql.query("DELETE FROM olympiad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} olympiad`);
    result(null, res);
  });
};

module.exports = Olympiad;
