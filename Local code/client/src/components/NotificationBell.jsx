import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
   
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
