const dbConfig = require("./../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.role = require("./role.model.js");
db.user = require("./user.model.js");
db.checklists = require("./checklist.model.js")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;