import React from 'react';

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p style={{ color }}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
