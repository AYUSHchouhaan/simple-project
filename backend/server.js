require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory user storage (in production, use a database)
const users = [];

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };

    // Store user (in production, save to database)
    users.push(newUser);

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sample data
const dashboardData = {
  stats: {
    totalUsers: 1250,
    revenue: 45600,
    orders: 342,
    growth: 12.5
  },
  recentActivity: [
    { id: 1, user: 'John Doe', action: 'Placed an order', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Made a payment', time: '6 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'Created account', time: '8 hours ago' }
  ],
  salesData: [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 5200 },
    { month: 'Mar', sales: 4800 },
    { month: 'Apr', sales: 6100 },
    { month: 'May', sales: 7200 },
    { month: 'Jun', sales: 6800 }
  ]
};

// Routes
app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.get('/api/stats', (req, res) => {
  res.json(dashboardData.stats);
});

app.get('/api/activity', (req, res) => {
  res.json(dashboardData.recentActivity);
});

app.get('/api/sales', (req, res) => {
  res.json(dashboardData.salesData);
});

app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
