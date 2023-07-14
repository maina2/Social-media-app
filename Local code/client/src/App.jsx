import './App.css';
import Header from './components/Header';
import LeftSidebar from './components/Leftsidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import FindFriends from './Pages/FindFriends';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import RightSidebar from './components/Rightsidebar';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <LeftSidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-friends" element={<FindFriends />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <RightSidebar />
        </div>
      </div>
    </Router>
  );
};

export default App;
