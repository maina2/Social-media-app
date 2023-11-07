import  { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LeftSidebar from './components/Leftsidebar';
import Home from './Pages/Home';
import FindFriends from './Pages/FindFriends';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import RightSidebar from './components/Rightsidebar';
import SignIn from './components/SignIn';
import Register from './components/Registerpage';
import Logout from './Pages/Logout';
import { AppContext } from './AppContext'; // Import the AppContext

const App = () => {
  const { isLoggedIn } = useContext(AppContext);

  console.log('isLoggedIn:', isLoggedIn);

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Header />}
        <div className="content">
          {isLoggedIn && <LeftSidebar />}
          <div className="main-content">
            <Routes>
              <Route path="/" element={!isLoggedIn ? <SignIn /> : <Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/find-friends" element={<FindFriends />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
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
