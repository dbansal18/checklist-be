const { authJwt } = require("../middleware");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const checklists = require("../controllers/checklist.controller.js");
  
    // var router = require("express").Router();
  
    // Create a new Checklist
    // router.post("/", checklists.create);
  
    // Retrieve all Checklists
    app.get("/api/checklist", [authJwt.verifyToken], checklists.userChecklist);

    // Retrieve a single Checklist with id
    // router.get("/:id", checklists.findOne);
  
    // Update a Checklist with id
    app.put("/api/checklist", [authJwt.verifyToken], checklists.update);
  
    // Delete a Checklist with id
    // router.delete("/:id", checklists.delete);
  
    // Create a new Checklist
    // router.delete("/", checklists.deleteAll);
  
    // app.use('/api/checklists', router);
};