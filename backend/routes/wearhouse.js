const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../config/db'); // Import database connection

// Get all WearHouses
router.get('/', (req, res) => {
  const query = 'SELECT * FROM WearHouse';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// Get a single WearHouse by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM WearHouse WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results[0]);
  });
});

// Create a new WearHouse
router.post('/', (req, res) => {
  const { name, state, city, status } = req.body;
  const query = 'INSERT INTO WearHouse (name, state, city, status) VALUES (?, ?, ?, ?)';
  db.query(query, [name, state, city, status], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'WearHouse added', id: result.insertId });
  });
});

// Update an existing WearHouse
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, state, city, status } = req.body;
  const query = 'UPDATE WearHouse SET name = ?, state = ?, city = ?, status = ? WHERE id = ?';
  db.query(query, [name, state, city, status, id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'WearHouse updated' });
  });
});

// Delete a WearHouse
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM WearHouse WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'WearHouse deleted' });
  });
});

module.exports = router;
