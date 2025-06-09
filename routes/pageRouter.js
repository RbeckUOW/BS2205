const { Router } = require("express");
const router = Router();

// Home page
router.get("/", (req, res) => {
  res.render("home", {
    nav: req.app.locals.nav,
    title: "Gear Up!",
  });
});

// Booking page
router.get("/booking", (req, res) => {
  res.render("booking", {
    nav: req.app.locals.nav,
    title: "Book Equipment",
  });
});

// Contact page
router.get("/contact", (req, res) => {
  res.render("contact", {
    nav: req.app.locals.nav,
    title: "Contact us",
  });
});

// About page
router.get("/about", (req, res) => {
  res.render("about", {
    nav: req.app.locals.nav,
    title: "About us",
  });
});

// Reservations page
router.get("/reservationsmade", (req, res) => {
  res.render("reservationsview", {
    nav: req.app.locals.nav,
    title: "Reservations",
  });
});

// Reservation form
router.get("/reserve-form", (req, res) => {
  const { id, name } = req.query; // Get the equipment ID and name from the query parameters

  // Render the form page, passing the equipment data to be used in the form
  res.render("reserveForm", {
    equipmentId: id,
    equipmentName: name,
    title: `Reserve ${name}`,
  });
});

module.exports = router;
