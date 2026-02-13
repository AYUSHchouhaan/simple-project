require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
