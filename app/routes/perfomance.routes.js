module.exports = app => {
    const perfomances = require("../controllers/perfomance.controller.js");
    
    // Retrieve perfomance
    app.get("/perfomance/:pupilId", perfomances.findByPupilId);
  };
  