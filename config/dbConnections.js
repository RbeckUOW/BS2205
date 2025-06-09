require("dotenv").config();
const mongoose = require("mongoose");

// Environment variable for database URI
const equipmentDBURI = process.env.EQUIPMENT_DB_URI;

// Equipment Database Connection
const equipmentDBConnection = mongoose.createConnection(equipmentDBURI, {});

// Console logging for connection state
equipmentDBConnection.on("connected", () =>
  console.log("Connected to Equipment Database")
);
equipmentDBConnection.on("error", (err) =>
  console.error("Equipment Database Connection Error:", err)
);

module.exports = { equipmentDBConnection };