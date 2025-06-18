import express from 'express';
import cors from 'cors';
import { loginUser, registerUser } from './a.mjs'; // your logic file

const app = express();
const PORT = 3000;

app.use(cors()); // allow React Native to talk to backend
app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const success = await loginUser(usernameOrEmail, password);

  if (success) {
    return res.json({ success: true, message: 'Login successful!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
});

// Optional: registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await registerUser(username, email, password);
    return res.json({ success: true, message: 'Registration successful!' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
