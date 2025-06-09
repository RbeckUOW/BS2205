const mongoose = require("mongoose");
const { equipmentDBConnection } = require("../config/dbConnections");

const equipmentSchema = new mongoose.Schema({
  name: String,
  image: String,
  totalQuantity: Number,
  availableQuantity: Number,
});

// equipmentDBConnection as imported from .ENV file
const Equipment = equipmentDBConnection.model("Equipment", equipmentSchema);

module.exports = Equipment;