# Backend Architecture

## Overview
The backend of this project is a simple Express.js server that provides API endpoints for a dashboard application. It serves static data but is structured to easily integrate with a database in the future.

## Entry Point
The main entry point is `backend/server.js`, which creates an Express application listening on port 5000 (configurable via environment variables).

## Dependencies
- `express`: Web framework for Node.js
- `cors`: Enables Cross-Origin Resource Sharing
- `dotenv`: Loads environment variables from `.env` file

## API Endpoints
The backend exposes the following RESTful API endpoints:

1. `GET /` - Health check endpoint returning a simple message
2. `GET /api/dashboard` - Returns all dashboard data including stats, activity, and sales
3. `GET /api/stats` - Returns statistics data (users, revenue, orders, growth)
4. `GET /api/activity` - Returns recent user activity data
5. `GET /api/sales` - Returns sales data by month

## Data Structure
Currently, the backend uses static sample data stored in memory:

```javascript
const dashboardData = {
  stats: {
    totalUsers: 1250,
    revenue: 45600,
    orders: 342,
    growth: 12.5
  },
  recentActivity: [
    // Array of activity objects
  ],
  salesData: [
    // Array of monthly sales data
  ]
};
```

## Frontend Integration
The frontend (React application in the `frontend/` directory) connects to the backend via:
- API URL: `http://localhost:5000/api`
- Uses Axios for HTTP requests
- Makes GET requests to fetch dashboard data on component mount

## Running the Backend
1. Navigate to the `backend/` directory
2. Install dependencies: `npm install`
3. Start the server: `npm start` (or `npm run dev` for development with nodemon)

## Environment Variables
The backend uses the following environment variables:
- `PORT`: Port number for the server (defaults to 5000 if not set)

## Future Enhancements
To make this a production-ready backend, consider:
1. Replacing static data with database integration (MongoDB, PostgreSQL, etc.)
2. Adding authentication middleware
3. Implementing data validation and error handling
4. Adding unit and integration tests
5. Setting up logging for better debugging