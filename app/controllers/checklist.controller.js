const db = require("../models");
const Checklist = db.checklists;

// Create and Save a new Checklist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Checklist
    const checklist = new Checklist({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Checklist in the database
    checklist
      .save(checklist)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Checklist."
        });
      });
};

// Retrieve all Checklists from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Checklist.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving checklists."
        });
      });
};

// Find a single Checklist with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Checklist.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Checklist with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Checklist with id=" + id });
      });
};

// Update a Checklist by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Checklist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Checklist with id=${id}. Maybe Checklist was not found!`
          });
        } else res.send({ message: "Checklist was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Checklist with id=" + id
        });
      });
};

// Delete a Checklist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Checklist.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Checklist with id=${id}. Maybe Checklist was not found!`
          });
        } else {
          res.send({
            message: "Checklist was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Checklist with id=" + id
        });
      });
};

// Delete all Checklists from the database.
exports.deleteAll = (req, res) => {
    Checklist.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Checklists were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all checklists."
        });
      });
};

// Find all published Checklists
exports.findAllPublished = (req, res) => {
    Checklist.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving checklists."
        });
      });
};