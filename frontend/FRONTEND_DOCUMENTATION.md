# Frontend Architecture Documentation

## Overview
The frontend is a React-based dashboard application that displays key metrics and data visualizations. It communicates with a backend API to fetch dashboard data.

## Project Structure
```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # Reusable UI components
│   ├── App.js              # Main application component
│   ├── App.css             # Main application styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
```

## How It Works

### 1. Entry Point (index.js)
- The application starts at `src/index.js`
- It renders the main `App` component into the DOM element with id "root"
- Uses React's strict mode for highlighting potential problems

### 2. Main Application (App.js)
- Fetches dashboard data from the backend API (`http://localhost:5000/api/dashboard`)
- Displays loading state while fetching data
- Shows error message if the API request fails
- Renders the dashboard UI with:
  - Header with title
  - Stats grid with 4 StatCard components
  - Content grid with:
    - ActivityList component for recent activity
    - SalesChart component for sales visualization

### 3. Components
- **StatCard**: Displays a metric with an icon, title, and value
- **ActivityList**: Shows a list of recent user activities
- **SalesChart**: Visualizes sales data with a bar chart
- **Login**: A login form component (not currently used in main app flow)

### 4. Styling
- Uses plain CSS with global styles defined in `index.css` and component-specific styles in `App.css`
- Responsive design with CSS Grid and Flexbox
- Mobile-friendly with media queries

### 5. Data Flow
1. App component mounts and calls `fetchDashboardData()`
2. Makes GET request to `/api/dashboard` endpoint
3. On success, stores data in state and renders components
4. On error, displays error message
5. Components receive data via props and render UI

### 6. Dependencies
- React: UI library
- Axios: HTTP client for API requests

## Development
To run the frontend:
1. Ensure backend is running on port 5000
2. Navigate to frontend directory
3. Run `npm start`
4. Visit `http://localhost:3000` in browser