module.exports = app => {
  const pupils = require("../controllers/pupil.controller.js");

  // Create a new pupil
  app.post("/pupils", pupils.create);

  // Retrieve all pupils
  app.get("/pupils", pupils.findAll);

  // Retrieve a single pupil with pupilId
  app.get("/pupils/:pupilId", pupils.findOne);

  // Update a pupil with pupilId
  app.put("/pupils/:pupilId", pupils.update);

  // Delete a pupil with pupilId
  app.delete("/pupils/:pupilId", pupils.delete);

  // Create a new pupil
  app.delete("/pupils", pupils.deleteAll);
};
