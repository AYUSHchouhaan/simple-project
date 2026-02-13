# Simple Dashboard Project

A full-stack dashboard application with React frontend and Node.js backend.

## Project Structure

```
simple-web/
├── backend/          # Node.js Express API
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env          # Environment variables
│
└── frontend/         # React application
    ├── public/       # Static files
    ├── src/          # React components
    │   ├── components/  # Reusable components
    │   ├── App.js      # Main App component
    │   └── index.js    # Entry point
    └── package.json  # Frontend dependencies
```

## Features

- **Dashboard Statistics**: Display key metrics (Users, Revenue, Orders, Growth)
- **Recent Activity**: Show latest user activities
- **Sales Chart**: Visual representation of monthly sales data
- **Responsive Design**: Mobile-friendly interface
- **REST API**: Backend API endpoints for data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-reload:
   ```
   npm run dev
   ```

The backend will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

The frontend will run on http://localhost:3000

## API Endpoints

- `GET /api/dashboard` - Get all dashboard data
- `GET /api/stats` - Get statistics only
- `GET /api/activity` - Get recent activities
- `GET /api/sales` - Get sales data

## Technologies Used

### Backend
- Express.js - Web framework
- CORS - Cross-origin resource sharing
- dotenv - Environment variables

### Frontend
- React - UI library
- Axios - HTTP client
- CSS3 - Styling

## Development

The project includes:
- Hot reload for both frontend and backend
- CORS enabled for local development
- Sample data for demonstration

## Next Steps

You can enhance this project by:
- Adding user authentication
- Connecting to a real database (MongoDB, PostgreSQL)
- Adding more dashboard widgets
- Implementing data filtering and search
- Adding charts library (Chart.js, Recharts)
- Deploy to cloud platforms (Vercel, Heroku, AWS)
