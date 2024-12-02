const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../config/db'); // Import database connection

// Get all cities
router.get('/', (req, res) => {
  const query = 'SELECT * FROM cities';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// Get a single city by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM cities WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results[0]);
  });
});

// Create a new city
router.post('/', (req, res) => {
  const { city_name, city_code, state, status } = req.body;
  const query = 'INSERT INTO cities (city_name, city_code, state, status) VALUES (?, ?, ?, ?)';
  db.query(query, [city_name, city_code, state, status], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'City added', id: result.insertId });
  });
});

// Update an existing city
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { city_name, city_code, state, status } = req.body;
  const query = 'UPDATE cities SET city_name = ?, city_code = ?, state = ?, status = ? WHERE id = ?';
  db.query(query, [city_name, city_code, state, status, id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'City updated' });
  });
});

// Delete a city
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cities WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'City deleted' });
  });
});

module.exports = router;
