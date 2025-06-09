require("dotenv").config(); // Load environment variables

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require ("mongoose");

const equipmentDBConnection = require("./config/dbConnections.js"); // Import database connections from separate file.

const app = express();
const PORT = process.env.PORT || 8080;

// Import page routers
const pageRouter = require("./routes/pageRouter.js"); // Handles static pages and page routing
const equipmentRouter = require("./routes/equipmentAPIRouter.js"); // For Equipment database
const reservationsRouter = require("./routes/reservationsAPIRouter.js"); // For Reservations database

// Connect to MongoDB
const equipmentDBURI = process.env.EQUIPMENT_DB_URI;
if (!equipmentDBURI) {
  console.error("MongoDB URI is not defined! Make sure EQUIPMENT_DB_URI is set.");
  process.exit(1);
}

mongoose
  .connect(equipmentDBURI, { 
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Equipment Database Connection Error:", err);
    process.exit(1);
  });

// Middleware setup
app.use(morgan("tiny")); // Log incoming requests
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// Static file serving
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder
app.use("/css", express.static(path.join(__dirname, "public/css"))); // Serve CSS files
app.use("/js", express.static(path.join(__dirname, "public/js"))); // Serve JavaScript files

// View engine setup
app.set("views", path.join(__dirname, "views")); // Set views directory
app.set("view engine", "ejs"); // Use EJS templating engine

// Navigation links available globally
app.locals.nav = [
  { title: "Home", link: "/" },
  { title: "Book Equipment", link: "/booking" },
  { title: "Reservations", link: "/reservationsmade" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

// Page routes (Handles static pages and dynamic routes)
app.use("/", pageRouter);

// API routes for equipment and reservations
app.use("/equipment", equipmentRouter);
app.use("/reservations", reservationsRouter);

// Catch-all route for undefined paths (404 error)
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
