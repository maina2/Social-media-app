// import React from 'react';
// import { Link } from 'react-router-dom';
import './header.css'
import SearchBar from './SearchBar';
import chat from '../Assets/icons8-wechat-96.png'
import profile from '../Assets/peakpx (6).jpg'
import NotificationBell from './NotificationBell';

const Header = () => {

  return (
    <div className="header">
      <div className="logo">
        <img src={chat} alt="" />
      </div>
      <div className="search-bar">
      <SearchBar />
      </div>
      <div className="user-profile">
        <img src={profile} alt="P" className="profile-picture" />
        <span className="user-name">John Doe</span>
      </div>
      <div className="notification-bell">
        <NotificationBell/>
      </div>
    </div>
  );
};

export default Header;
