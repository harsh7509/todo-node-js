// routes/todos.js
const express = require('express');
const { TaskList, validateList } = require('../todo-list/list'); // Adjust the path based on your project structure
const router = express.Router();

// Get all To-Do items
router.get('/', async (req, res) => {
    try {
        const todos = await TaskList.find();
        res.status(200).send({ data: todos || [] });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

// Get a To-Do item by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await TaskList.findById(req.params.id);
        if (!todo) return res.status(404).send({ message: 'To-Do not found' });
        res.status(200).send({ data: todo });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

// Create a new To-Do item
router.post('/', async (req, res) => {
    const { error } = validateList(req.body);
    if (error) return res.status(400).send({ message: 'Invalid data', error: error.details[0].message });

    try {
        const newTodo = new TaskList(req.body);
        await newTodo.save();
        res.status(201).send({ data: newTodo, message: 'To-Do created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error creating To-Do', error: error.message });
    }
});

// Update a To-Do item by ID
router.put('/:id', async (req, res) => {
    const { error } = validateList(req.body);
    if (error) return res.status(400).send({ message: 'Invalid data', error: error.details[0].message });

    try {
        const todo = await TaskList.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).send({ message: 'To-Do not found' });
        res.status(200).send({ data: todo });
    } catch (error) {
        res.status(400).send({ message: 'Error updating To-Do', error: error.message });
    }
});

// Delete a To-Do item by ID
router.delete('/:id', async (req, res) => {
    try {
        const todo = await TaskList.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).send({ message: 'To-Do not found' });
        res.status(200).send({ message: 'To-Do deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
