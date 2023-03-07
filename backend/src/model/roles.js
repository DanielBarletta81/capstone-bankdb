const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    username: {type: String},
    email: {type: String}

});

const Role = mongoose.model('Role', roleSchema);


module.exports = Role;