const mongoose = require('mongoose');


const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./roles");

db.ROLES = ["user", "employee", "bigboss"];

module.exports = db;