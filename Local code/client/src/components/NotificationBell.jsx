import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
    // Implement the desired functionality when the bell icon is clicked
    // For example, mark notifications as read or display a notification popup

    // Update the notification count
    setNotificationCount(notificationCount + 1);
  };

  return (
    <div className="notification-bell" onClick={handleNotificationClick}>
      <FontAwesomeIcon icon={faBell} />
      {notificationCount > 0 && (
        <span className="notification-badge">{notificationCount}</span>
      )}
    </div>
  );
};

export default NotificationBell;
