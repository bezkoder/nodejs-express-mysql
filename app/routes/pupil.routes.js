module.exports = app => {
  const pupils = require("../controllers/pupil.controller.js");

  // Retrieve all pupils
  app.get("/pupils", pupils.findAll);

  // Retrieve a single pupil with pupilId
  app.post("/login", pupils.loginStudent);

  // Retrieve classmates
  app.get("/pupils/classmates/:classId", pupils.findByClass);
};
