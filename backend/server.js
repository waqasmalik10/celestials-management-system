require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Allow frontend at http://localhost:3000 (adjust if different)
app.use(cors({ origin: 'http://localhost:3000' }));

const USERS_FILE = path.join(__dirname, 'users.json');
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// SIGNUP
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    if (!name || !email || !password || !department) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const users = readUsers();
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), name, email, password: hashed, department };
    users.push(user);
    writeUsers(users);

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, department: user.department }, JWT_SECRET, { expiresIn: '6h' });

    // Return non-sensitive user data + token
    return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, department: user.department }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '6h' });
    return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// VERIFY TOKEN (used by dashboard to confirm user)
app.get('/api/verify', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ success: false, message: 'No token' });

  const token = auth.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
    return res.json({ success: true, user: decoded });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));