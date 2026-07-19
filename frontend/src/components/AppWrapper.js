import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detect OAuth redirect parameters from backend (e.g. ?auth=true&name=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth') === 'true') {
        // Optionally store user info
        const name = params.get('name');
        const email = params.get('email');
        const picture = params.get('picture');
        const user = { name, email, picture };
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}

        setIsLoggedIn(true);

        // Clean up URL to remove query params
        if (window.history && window.history.replaceState) {
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try { localStorage.removeItem('user'); } catch (e) {}
  };

  return (
    <div className="app-wrapper">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AppWrapper;