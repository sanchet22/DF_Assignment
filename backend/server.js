const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors"); // Import CORS
require("dotenv").config();
const stateRoutes = require('./routes/states');
const cityRoutes = require('./routes/cities'); 
const wearhouseRoutes = require('./routes/wearhouse');
const db = require('./config/db');

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:3000" })); // Replace with your frontend origin
app.use(bodyParser.json());

// Database Configuration
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL Database: " + process.env.DB_NAME);
});

// Register User Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Email and Password are required!");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).send("Error registering user");
      res.status(201).send("User registered successfully");
    });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// Login User Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Email and Password are required!");

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send("Invalid credentials");

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  });
});

// Middleware to Verify Token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
}
app.use('/api/states', stateRoutes);
app.use('/cities', cityRoutes);
app.use('/wearhouse', wearhouseRoutes);

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).send("Welcome to the protected route!");
});

// Start the Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
