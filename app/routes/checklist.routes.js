module.exports = app => {
    const checklists = require("../controllers/checklist.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Checklist
    router.post("/", checklists.create);
  
    // Retrieve all Checklists
    router.get("/", checklists.findAll);
  
    // Retrieve all published Checklists
    router.get("/published", checklists.findAllPublished);
  
    // Retrieve a single Checklist with id
    router.get("/:id", checklists.findOne);
  
    // Update a Checklist with id
    router.put("/:id", checklists.update);
  
    // Delete a Checklist with id
    router.delete("/:id", checklists.delete);
  
    // Create a new Checklist
    router.delete("/", checklists.deleteAll);
  
    app.use('/api/checklists', router);
};