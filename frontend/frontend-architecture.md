Frontend Architecture
=====================

Purpose
-------
This document describes the architecture of the React frontend in this repo: how the app is structured, where data fetching and routing happen, and important implementation notes and suggestions.

Quick summary
-------------
- React single-page app (CRA-style) with component-based UI.
- Entry points: src/index.js and src/App.js (both currently wrap with a BrowserRouter — see "Known issues").
- AppWrapper toggles between a client-simulated Login and the Dashboard view.
- Dashboard handles data fetching from backend at http://localhost:5000/api/dashboard and renders StatCard, ActivityList, SalesChart, and Profile.

Project layout (relevant files)
-------------------------------
frontend/
├─ src/
│  ├─ index.js           # ReactDOM entry
│  ├─ App.js             # App component wrapping AppWrapper with Router
│  ├─ App.css            # global/app styles
│  ├─ index.css          # global styles
│  └─ components/
│     ├─ AppWrapper.js   # toggles Login <-> Dashboard
│     ├─ Login.jsx       # simulated login form and validation
│     ├─ Dashboard.js    # fetches dashboard API, routes for dashboard/profile
│     ├─ StatCard.js     # small stat display
│     ├─ ActivityList.js # list of recent activities
│     ├─ SalesChart.js   # simple bar-chart implementation
│     └─ Profile.js      # placeholder profile view

Entry points and routing
------------------------
- src/index.js mounts the app and wraps <App /> in a BrowserRouter.
- src/App.js also wraps AppWrapper in a BrowserRouter. This results in nested BrowserRouter components — not harmful in many cases but unnecessary and should be simplified to a single router.
- AppWrapper manages authentication state (isLoggedIn) locally and shows Login or Dashboard.
- Dashboard uses react-router <Routes> and <Route> to switch between the main dashboard and /profile.

Data fetching and data flow
--------------------------
- Dashboard.js contains an axios GET to `${API_URL}/dashboard` (API_URL = http://localhost:5000/api).
- On mount it calls fetchDashboardData which sets loading / error states and stores the response in local component state (dashboardData).
- Child components receive portions of dashboardData via props.

API contract (expected shape)
----------------------------
GET /api/dashboard -> JSON object with at least:
- stats: { totalUsers: number, revenue: number, orders: number, growth: number }
- recentActivity: [{ id, user, action, time }, ...]
- salesData: [{ month: string, sales: number }, ...]

Styling
-------
- Styling is plain CSS with global files and some component-level CSS files (e.g., Login.css, Dashboard.css).
- Layout uses CSS Grid and Flexbox.

Known issues / discrepancies
--------------------------
- Redundant BrowserRouter: index.js and App.js both mount a Router. Remove one to avoid confusion and potential issues with location/history.
- Existing frontend documentation file (FRONTEND_DOCUMENTATION.md) incorrectly states that App.js fetches dashboard data. In reality, Dashboard.js performs the fetch. Consider updating that file or consolidating docs.
- Login is simulated and does not persist authentication: AppWrapper holds auth state in memory only.
- SalesChart assumes data array is non-empty (Math.max on mapped values); add defensive checks for empty or malformed data.

Recommendations / Next steps
---------------------------
- Remove duplicate BrowserRouter (keep it in index.js or App.js, not both).
- Add better error handling and defensive checks around API data.
- Consider introducing a central data layer (context or state manager) if more pages/components need dashboard data.
- Add unit tests for components and integration tests for data-fetching paths. Consider mocking the backend for local development.
- Implement real authentication (token storage, refresh flows) if the app will be used beyond demos.
- Consolidate documentation: either replace FRONTEND_DOCUMENTATION.md with this file or merge the useful parts there.

How to run
----------
1. cd frontend
2. npm install
3. npm start
4. Ensure backend API runs on http://localhost:5000

Notes
-----
This file was created by scanning the frontend source files. For more details, see frontend/FRONTEND_DOCUMENTATION.md and frontend/README_SUMMARY.txt which already exist and overlap with this content.
