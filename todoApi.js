const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const task = { id: nextId++, title, completed: Boolean(completed) };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, completed } = req.body;
  if (title !== undefined) task.title = String(title);
  if (completed !== undefined) task.completed = Boolean(completed);

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const removed = tasks.splice(index, 1)[0];
  res.json(removed);
});

app.listen(port, () => {
  console.log(`TODO API listening on http://localhost:${port}`);
});
