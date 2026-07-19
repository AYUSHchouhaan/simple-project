Summary of the frontend dashboard application

What it is:
- React-based dashboard app displaying metrics, recent activity, and a simple sales chart. Includes a client-simulated login and a static profile page.

Main purpose:
- Fetch dashboard data from backend (http://localhost:5000/api/dashboard) and visualize:
  - Stat cards: Total Users, Revenue, Orders, Growth
  - Recent activity list
  - Sales overview chart
  - Profile page

Key components:
- src/index.js — entry
- src/App.js — router wrapper
- src/components/AppWrapper.js — toggles Login vs Dashboard
- src/components/Login.jsx — login form (client-side validation, simulated API delay)
- src/components/Dashboard.js — fetches API, handles loading/error, renders dashboard and profile routes
- src/components/StatCard.js, ActivityList.js, SalesChart.js — UI components
- src/components/Profile.jsx — static profile view

API expectations:
- GET http://localhost:5000/api/dashboard
- Expected JSON shape:
  - stats: { totalUsers, revenue, orders, growth }
  - recentActivity: [{ id, user, action, time }, ...]
  - salesData: [{ month, sales }, ...]

Notes & suggestions:
- Login is simulated; no real auth persistence.
- Add defensive checks for missing/empty API data (SalesChart uses Math.max on data).
- Consider integrating real auth, mocking backend for local dev, and adding tests.

How to run:
- cd frontend && npm install && npm start
- Ensure backend runs on port 5000
