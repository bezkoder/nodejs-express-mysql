const sql = require("./db.js");

// constructor
const Achievement = function(Achievement) {
  this.id = Achievement.id;
  this.pupil_id = Achievement.pupil_id
  this.name = Achievement.name;
  this.date = Achievement.date;
  this.type = Achievement.type;
};

Achievement.create = (newPupil, result) => {
  sql.query("INSERT INTO achievement SET ?", newPupil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Achievement: ", { id: res.insertId, ...newPupil });
    result(null, { id: res.insertId, ...newPupil });
  });
};

Achievement.findByPupilId = (pupilId, result) => {
  sql.query(`SELECT * FROM achievement WHERE pupil_id = ${pupilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Achievements: ", res);
      result(null, res);
      return;
    }

    // not found Achievement with the id
    result({ kind: "not_found" }, null);
  });
};

Achievement.getAll = result => {
  sql.query("SELECT * FROM achievement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("achievements: ", res);
    result(null, res);
  });
};

Achievement.updateById = (id, Achievement, result) => {
  sql.query(
    "UPDATE achievement SET email = ?, name = ?, active = ? WHERE id = ?",
    [Achievement.email, Achievement.name, Achievement.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Achievement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Achievement: ", { id: id, ...Achievement });
      result(null, { id: id, ...Achievement });
    }
  );
};

Achievement.remove = (id, result) => {
  sql.query("DELETE FROM achievement WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Achievement with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Achievement with id: ", id);
    result(null, res);
  });
};

Achievement.removeAll = result => {
  sql.query("DELETE FROM achievement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} achievement`);
    result(null, res);
  });
};

module.exports = Achievement;
