module.exports = app => {
    const announcements = require("../controllers/announcement.controller.js");
    
    // Retrieve announcement
    app.get("/announcement/:schooldId", announcements.findBySchoolId);
  };
  