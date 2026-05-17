import React from 'react';
import './UserProfile.css';

function UserProfile({ user }) {
  return (
    <div className="user-profile-card">
      <div className="user-profile-header">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={`${user.name}'s avatar`}
          className="user-avatar"
        />
        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-role">{user.role}</p>
        </div>
      </div>
      <div className="user-details">
        <div className="user-detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;