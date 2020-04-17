const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({});

const Employe = mongoose.model("Employee", employeSchema);
exports.Employe = Employe;