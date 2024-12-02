const express = require('express');
const router = express.Router();
require("dotenv").config();
const db = require('../config/db'); // Import database connection
// Get all states
router.get('/', (req, res) => {
  const query = 'SELECT * FROM states';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// Get a single state by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM states WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results[0]);
  });
});

// Create a new state
router.post('/', (req, res) => {
  const { name, code, status } = req.body;
  const query = 'INSERT INTO states (name, code, status) VALUES (?, ?, ?)';
  db.query(query, [name, code, status], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'State added', id: result.insertId });
  });
});

// Update an existing state
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, code, status } = req.body;
  const query = 'UPDATE states SET name = ?, code = ?, status = ? WHERE id = ?';
  db.query(query, [name, code, status, id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'State updated' });
  });
});

// Delete a state
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM states WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'State deleted' });
  });
});

module.exports = router;
