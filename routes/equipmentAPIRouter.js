const express = require("express");
const router = express.Router();
const Equipment = require("../models/equipment");

// Fetch all equipment from database
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment); // Send equipment data to frontend
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
});

module.exports = router;
