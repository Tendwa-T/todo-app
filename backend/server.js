const express = require('express');
const cors = require ('cors');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/todo-app';
const todoRoutes = require('./routes/todoRoutes');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose error: ${err}`);
});

app.use('/api/todos', todoRoutes);