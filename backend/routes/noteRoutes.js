const express = require('express');
const router = express.Router();
const {
  createNote,
  getNote,
  updateNote,
} = require('../controllers/noteController');

router.post('/notes', createNote);
router.get('/notes/:id', getNote);
router.put('/notes/:id', updateNote);

module.exports = router;
