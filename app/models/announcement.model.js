const sql = require("./db.js");

// constructor
const Announcement = function(Announcement) {
  this.id = Announcement.id;
  this.school_id = Announcement.school_id
  this.text = Announcement.text;
};


Announcement.getBySchool = (schoolId, result) => {
  sql.query(`SELECT * FROM announcement WHERE school_id = ${schoolId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("announcement: ", res);
    result(null, res);
  });
};

module.exports = Announcement;
