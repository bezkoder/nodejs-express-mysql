module.exports = app => {
    const achievements = require("../controllers/achievement.controller.js");
  
    // Create a new achievement
    app.post("/achievements", achievements.create);
  
    // Retrieve all achievements
    app.get("/achievements", achievements.findAll);
  
    // Retrieve achievements with pupilId
    app.get("/achievements/:pupilId", achievements.findByParent);
  
    // Update a achievement with id
    app.put("/achievements/:achievementId", achievements.update);
  
    // Delete a achievement with id
    app.delete("/achievements/:achievementId", achievements.delete);
  
    // delete achievement
    app.delete("/achievements", achievements.deleteAll);
  };
  