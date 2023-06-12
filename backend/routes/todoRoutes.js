const expression = require('express');
const router = expression.Router();
const Todo = require('../models/todoSchema');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Couldn't get todos"});
    }
});

router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: "Unable to save Agenda" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message:"Unable to update" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        await todo.remove();
        res.json({ message: 'Deleted Todo' });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete message"});
    }
});

module.exports= router;