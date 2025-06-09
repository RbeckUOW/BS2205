const mongoose = require("mongoose");
const { equipmentDBConnection } = require("../config/dbConnections");

const reservationSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  name: { type: String, required: true }, // User's name required for booking
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reservation = equipmentDBConnection.model("reservations", reservationSchema);

module.exports = Reservation;