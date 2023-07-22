import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import LeftSidebar from './components/Leftsidebar';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import FindFriends from './Pages/FindFriends';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import RightSidebar from './components/Rightsidebar';
import SignIn from './components/SignIn';
import Register from './components/Registerpage';
import Logout from './Pages/Logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem('user');
    return !!user;
  });

  const handleSignInSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the user's authentication status from localStorage
    localStorage.removeItem('user');

    // Update the isLoggedIn state to false
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Header />}
        <div className="content">
          {isLoggedIn && <LeftSidebar />}
          <div className="main-content">
            <Routes>
              {/* Show the SignIn component at the root URL only if the user is not authenticated */}
              <Route path="/" element={!isLoggedIn ? <SignIn handleSignInSuccess={handleSignInSuccess} /> : <Navigate to="/home" />} />
              <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
              <Route path="/find-friends" element={isLoggedIn ? <FindFriends /> : <Navigate to="/" />} />
              <Route path="/messages" element={isLoggedIn ? <Messages /> : <Navigate to="/" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
              <Route path="/signin" element={!isLoggedIn ? <SignIn handleSignInSuccess={handleSignInSuccess} /> : <Navigate to="/home" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
              {/* Add a catch-all route to redirect to the SignIn page if the user tries to access an unknown route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          {isLoggedIn && <RightSidebar />}
        </div>
      </div>
    </Router>
  );
};

export default App;
