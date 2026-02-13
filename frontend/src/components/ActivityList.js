import React from 'react';

function ActivityList({ activities }) {
  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <div className="activity-user">{activity.user}</div>
          <div className="activity-action">{activity.action}</div>
          <div className="activity-time">{activity.time}</div>
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;
