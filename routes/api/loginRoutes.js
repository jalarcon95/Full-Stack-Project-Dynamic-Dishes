// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// const port = 3000;
// const secretKey = 'your-secret-key';
// const users = [];

// app.use(express.json());
// app.use(cors());

// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;
//   if (users.some(user => user.username === username))
//     return res.status(409).json({ message: 'Username already exists.' });

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     res.status(201).json({ message: 'Registration successful.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Registration failed.' });
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(user => user.username === username);
//   if (!user || !(await bcrypt.compare(password, user.password)))
//     return res.status(401).json({ message: 'Invalid credentials.' });

//   const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
//   res.json({ message: 'Login successful.', token });
// });

// app.post('/api/logout', (req, res) => {
//   return res.json({ message: 'Logout successful.' });
// });

// app.listen(port, () => console.log(`Server listening on port ${port}`));