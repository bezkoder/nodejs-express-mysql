module.exports = app => {
    const schedules = require("../controllers/schedule.controller.js");
    
    // Retrieve schedule
    app.get("/schedule/:classId", schedules.findByClass);
  };
  