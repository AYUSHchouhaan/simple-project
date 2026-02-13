import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StatCard from './components/StatCard';
import ActivityList from './components/ActivityList';
import SalesChart from './components/SalesChart';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`);
      setDashboardData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data. Make sure the backend is running.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </header>

      <div className="stats-grid">
        <StatCard 
          title="Total Users" 
          value={dashboardData.stats.totalUsers.toLocaleString()}
          icon="👥"
          color="#4CAF50"
        />
        <StatCard 
          title="Revenue" 
          value={`$${dashboardData.stats.revenue.toLocaleString()}`}
          icon="💰"
          color="#2196F3"
        />
        <StatCard 
          title="Orders" 
          value={dashboardData.stats.orders.toLocaleString()}
          icon="📦"
          color="#FF9800"
        />
        <StatCard 
          title="Growth" 
          value={`${dashboardData.stats.growth}%`}
          icon="📈"
          color="#9C27B0"
        />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2>Recent Activity</h2>
          <ActivityList activities={dashboardData.recentActivity} />
        </div>

        <div className="card">
          <h2>Sales Overview</h2>
          <SalesChart data={dashboardData.salesData} />
        </div>
      </div>
    </div>
  );
}

export default App;
