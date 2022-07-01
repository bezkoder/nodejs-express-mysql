const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const { title, description, published } = req.body;
  // Validate request
  if (!req.body) {
    return res.status(400).json({ message: "Content can not be empty!" });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title,
    description,
    published: published || false,
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message || "Some error occurred while creating the Tutorial." });
    }
    
    return res.status(200).json(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const { title } = req.query;

  Tutorial.getAll(title, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message || "Some error occurred while retrieving tutorials." });
    }
    
    return res.status(200).json(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  const { id } = req.params;
  
  Tutorial.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Not found Tutorial with id ${req.params.id}.` });
      } else {
        return res.status(500).json({ message: `Error retrieving Tutorial with id ${req.params.id}` });
      }
    }
    
    return res.status(200).json(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message || "Some error occurred while retrieving tutorials." });
    }
      
    return res.status(200).json(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  // Validate Request
  if (!req.body) {
    return res.status(400).json({ message: "Content can not be empty!" });
  }

  Tutorial.updateById(
    id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).json({ message: `Not found Tutorial with id ${id}.` });
        } else {
          return res.status(500).json({ message: `Error updating Tutorial with id ${id}` });
        }
      }
      
      return res.status(200).json(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;
  Tutorial.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: `Not found Tutorial with id ${id}.` });
      } else {
        return res.status(500).json({ message: `Could not delete Tutorial with id ${id}` });
      }
    }
    
    return res.status(200).json({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message || "Some error occurred while removing all tutorials." });
    }
    
    return res.status(200).json({ message: `All Tutorials were deleted successfully!` });
  });
};
