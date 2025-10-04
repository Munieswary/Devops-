const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let students = []; // temporary storage

// GET all students
app.get('/students', (req, res) => res.json(students));

// POST new student
app.post('/students', (req, res) => {
  const student = { ...req.body, id: Date.now() };
  students.push(student);
  res.json({ message: 'Student added', student });
});

// PUT update student
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.map(s => (s.id === id ? { ...s, ...req.body } : s));
  res.json({ message: 'Student updated' });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted' });
});

// DELETE all students
app.delete('/students', (req, res) => {
  students = [];
  res.json({ message: 'All students deleted' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));