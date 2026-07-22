require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;

// OAuth config (use env or fallback dummy values)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET';
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${BACKEND_URL}/auth/google/callback`;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const dashboardData = {
  stats: {
    totalUsers: 1542,
    revenue: 61250,
    orders: 497,
    growth: 18.3
  },
  recentActivity: [
    { id: 1, user: 'Alex Johnson', action: 'Completed purchase', time: '10 min ago' },
    { id: 2, user: 'Maria Garcia', action: 'Updated payment method', time: '25 min ago' },
    { id: 3, user: 'David Smith', action: 'Viewed product catalog', time: '1 hour ago' },
    { id: 4, user: 'Sarah Williams', action: 'Created new account', time: '2 hours ago' },
    { id: 5, user: 'James Brown', action: 'Submitted support ticket', time: '3 hours ago' }
  ],
  salesData: [
    { month: 'Jan', sales: 12500 },
    { month: 'Feb', sales: 18600 },
    { month: 'Mar', sales: 14800 },
    { month: 'Apr', sales: 21000 },
    { month: 'May', sales: 24500 },
    { month: 'Jun', sales: 28300 },
    { month: 'Jul', sales: 31200 }
  ],
  lastUpdated: new Date().toISOString()
};

// Routes
app.get('/api/dashboard', (req, res) => {
  console.log('This is dashboard page');
  // Compute sales summary dynamically
  const totalSales = dashboardData.salesData.reduce((sum, s) => sum + s.sales, 0);
  const averageSales = Math.round((totalSales / dashboardData.salesData.length) * 100) / 100;
  const topMonth = dashboardData.salesData.reduce((prev, curr) => (curr.sales > prev.sales ? curr : prev));

  res.json({
    stats: dashboardData.stats,
    recentActivity: dashboardData.recentActivity,
    salesSummary: {
      totalSales,
      averageSales,
      topMonth
    },
    lastUpdated: dashboardData.lastUpdated
  });
});

app.get('/api/stats', (req, res) => {
  console.log('This is stats page');
  res.json({ ...dashboardData.stats, lastUpdated: dashboardData.lastUpdated });
});

app.get('/api/activity', (req, res) => {
  console.log('This is activity page');
  res.json(dashboardData.recentActivity);
});

app.get('/api/summary', (req, res) => {
  console.log('This is summary page');
  res.json({
    totalUsers: dashboardData.stats.totalUsers,
    revenue: dashboardData.stats.revenue,
    orders: dashboardData.stats.orders,
    growth: dashboardData.stats.growth
  });
});

app.get('/api/sales', (req, res) => {
  console.log('This is sales page');
  res.json(dashboardData.salesData);
});

app.get('/', (req, res) => {
  console.log('This is home page');
  res.json({ message: 'Dashboard API is running' });
});

app.get('/health', (req, res) => {
  console.log('This is health page');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- Google OAuth endpoints ---
// Redirect user to Google's OAuth 2.0 consent screen
app.get('/auth/google', (req, res) => {
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  };
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;
  res.redirect(authUrl);
});

// Callback endpoint that Google redirects back to with a code
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Missing code');
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: querystring.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error('Token exchange error', tokenData);
      return res.status(500).send('Token exchange failed');
    }

    const accessToken = tokenData.access_token;

    // Fetch user info

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const userInfo = await userRes.json();

    // For demo purposes: redirect back to frontend with user info in query params
    // In a real app you would create a session or issue your own JWT
    const redirectParams = querystring.stringify({
      auth: 'true',
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture
    });

    return res.redirect(`${FRONTEND_URL}/?${redirectParams}`);
  } catch (err) {
    console.error('OAuth callback error', err);
    return res.status(500).send('Authentication failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
