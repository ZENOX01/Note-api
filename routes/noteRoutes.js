const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { verifyToken } = require('../middleware/auth.middleware');

// Map routes to controller methods
router.get('/', verifyToken, noteController.getNotes);
router.post('/', verifyToken, noteController.createNote);
router.get('/:id', verifyToken, noteController.getNoteById);
router.put('/:id', verifyToken, noteController.updateNote);
router.delete('/:id', verifyToken, noteController.deleteNote);

module.exports = router;
