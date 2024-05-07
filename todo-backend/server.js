// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // Load environment variables from .env file




// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Todo Model
const Todo = mongoose.model('Todo', {
  text: String,
});

// Routes
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo updated successfully', updatedTodo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

