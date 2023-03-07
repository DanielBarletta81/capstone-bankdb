const mongoose = require('mongoose');


const db = {};

db.mongoose = mongoose;

db.user = require("../model/user");
db.role = require("../model/roles");

db.ROLES = ["user", "admin"];

module.exports = db;