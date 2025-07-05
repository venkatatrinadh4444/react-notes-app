const Note = require('../models/Note');

// Creating a new note
exports.createNote = async (req, res) => {
  try {
    const { title } = req.body;
    const note = await Note.create({ title });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a note by ID
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
