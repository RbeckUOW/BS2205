const express = require("express");
const router = express.Router();
const Equipment = require("../models/equipment");
const Reservation = require("../models/reservation");

// Helper function to check if equipment is available for the requested period
async function isEquipmentAvailable(equipmentId, startDate, endDate) {
  const overlappingReservation = await Reservation.findOne({
    equipmentId,
    $or: [
      {
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) },
      },
    ],
  });
  return !overlappingReservation; // Return true if no current reservation is found
}

// Helper function to create reservation and update equipment availability
async function createReservation(equipmentId, name, startDate, endDate) {
  const reservation = new Reservation({
    equipmentId,
    name,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  await reservation.save();

  const equipment = await Equipment.findById(equipmentId);
  if (equipment) {
    equipment.availableQuantity -= 1;
    await equipment.save();
  }

  return reservation;
}

// Fetch all reservations with equipment name
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate(
      "equipmentId",
      "name"
    ); // Fetch reservations and populate equipment names
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations." });
  }
});

// Reserve equipment
router.post("/reserve", async (req, res) => {
  const { equipmentId, name, startDate, endDate } = req.body;
// If any form fields are not filled in
  try {
    if (!equipmentId || !name || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found." });
    }

    const isAvailable = await isEquipmentAvailable(
      equipmentId,
      startDate,
      endDate
    );
    if (!isAvailable) {
      return res
        .status(400)
        .json({ error: "Equipment is already reserved for this period." });
    }

    const reservation = await createReservation(
      equipmentId,
      name,
      startDate,
      endDate
    );

    res.json({
      success: true,
      message: "Reservation created successfully!",
      reservation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create reservation." });
  }
});

// Cancel a reservation
router.post("/cancel", async (req, res) => {
  const { reservationId } = req.body;

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    const equipment = await Equipment.findById(reservation.equipmentId);
    if (equipment) {
      equipment.availableQuantity += 1;
      await equipment.save();
    }

    await Reservation.findByIdAndDelete(reservationId);

    res.json({ success: true, message: "Reservation canceled successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel reservation." });
  }
});

module.exports = router;