module.exports = app => {
    const teachers = require("../controllers/teacher.controller.js");
    
    // Retrieve teacher
    app.get("/teacher/:classId", teachers.findByClass);
  };
  