  import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login successful', formData);
        setLoginSuccess(true);
        // Here you would typically redirect the user or update app state
        if (onLogin) onLogin();
      } catch (error) {
        console.error('Login failed', error);
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {errors.general && <div className="error general-error">{errors.general}</div>}
          {loginSuccess && <div className="success-message">Login successful! Redirecting...</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <i className="icon-email">✉️</i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error-input' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <i className="icon-password">🔒</i>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error-input' : ''}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" disabled={isSubmitting} className="login-button">
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Signing in...
              </>
            ) : 'Sign In'}
          </button>
          <div className="divider">
            <span>or continue with</span>
          </div>
          <div className="social-login">
            <a href="http://localhost:5000/auth/google" className="social-button google">
              <span className="social-icon">G</span> Google
            </a>
            <button type="button" className="social-button facebook">
              <span className="social-icon">f</span> Facebook
            </button>
          </div>
          <div className="signup-link">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;