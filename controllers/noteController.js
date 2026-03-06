const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /notes
exports.getNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const MAX_LIMIT = 50;

        if (limit < 1 || limit > MAX_LIMIT || isNaN(limit)) {
            return res.status(400).json({
                message: `Limit must be between 1 and ${MAX_LIMIT}`
            });
        }

        if (page < 1 || isNaN(page)) {
            return res.status(400).json({ message: "Invalid page number" });
        }

        const skip = (page - 1) * limit;

        const query = search && search.trim() !== ""
            ? {
                user: req.user.id,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            }
            : { user: req.user.id };

        const notes = await Note.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Note.countDocuments(query);

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalNotes: total,
            notes
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get single note
// @route   GET /notes/:id
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new note
// @route   POST /notes
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = await Note.create({ 
            title, 
            content,
            user: req.user.id 
        });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Update note
// @route   PUT /notes/:id
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete note
// @route   DELETE /notes/:id
exports.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
};
