import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faEnvelope, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './leftsidebar.css';
import profile from '../Assets/peakpx (6).jpg';

const LeftSidebar = () => {
  const [hideText, setHideText] = useState(false);

  const handleSidebarClick = () => {
    setHideText(!hideText);
  };

  return (
    <div className={`left-sidebar ${hideText ? 'minimized' : ''}`}>
      <div className="profile-image">
        <img src={profile} alt="" />
      </div>

      <Link
        to="/"
        className={`sidebar-link ${hideText ? 'hide-text' : ''}`}
        onClick={handleSidebarClick}
      >
        <div className="icon-home">
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>Home</span>
      </Link>
      <Link
        to="/find-friends"
        className={`sidebar-link ${hideText ? 'hide-text' : ''}`}
        onClick={handleSidebarClick}
      >
        <FontAwesomeIcon icon={faUserFriends} />
        <span>Find Friends</span>
      </Link>
      <Link
        to="/messages"
        className={`sidebar-link ${hideText ? 'hide-text' : ''}`}
        onClick={handleSidebarClick}
      >
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Messages</span>
      </Link>
      <Link
        to="/profile"
        className={`sidebar-link ${hideText ? 'hide-text' : ''}`}
        onClick={handleSidebarClick}
      >
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span>
      </Link>

      {/* <Link
        to="/signin"
        className={`sidebar-link ${hideText ? 'hide-text' : ''}`}
        onClick={handleSidebarClick}
      >
        <FontAwesomeIcon icon={faSignInAlt} />
        <span>Sign In</span>
      </Link> */}

      <div className="separator"></div>
      <Link
        to="/logout"
        className={`sidebar-link ${hideText ? 'hide-text' : ''} logout-link`}
        onClick={handleSidebarClick}
      >
        <FontAwesomeIcon style={{ color: "#FF5A60" }} icon={faSignOutAlt} />
        <span style={{ color: "#FF5A60", fontFamily: "'Preahvihear', sans-serif" }}>Logout</span>
      </Link>
    </div>
  );
};

export default LeftSidebar;
