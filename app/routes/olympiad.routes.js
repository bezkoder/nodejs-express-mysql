module.exports = app => {
    const olympiads = require("../controllers/olympiad.controller.js");
  
    // Create a new olympiad
    app.post("/olympiads", olympiads.create);
  
    // Retrieve all olympiads
    app.get("/olympiads", olympiads.findAll);
  
    // Retrieve olympiads with pupilId
    app.get("/olympiads/:pupilId", olympiads.findByParent);
  
    // Update a olympiad with id
    app.put("/olympiads/:olympiadId", olympiads.update);
  
    // Delete a olympiad with id
    app.delete("/olympiads/:olympiadId", olympiads.delete);
  
    // delete olympiad
    app.delete("/olympiads", olympiads.deleteAll);
  };
  