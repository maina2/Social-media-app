import { useState, useEffect } from 'react';
import axios from 'axios';
import './findfriends.css';
import wallpaper from '../Assets/peakpx (14).jpg';

const FindFriends = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFollowUser = async (userId) => {
    try {
      // Determine the previous follow status of the user
      const isFollowed = users.find((user) => user.id === userId).is_followed;

      // Send the follow/unfollow request to the server based on the previous follow status
      if (isFollowed) {
        await axios.put(`http://localhost:8081/users/${userId}/unfollow`);
      } else {
        await axios.put(`http://localhost:8081/users/${userId}/follow`);
      }

      // Update the local state to reflect the change in follow status
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, is_followed: !isFollowed } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="find-friends-container">
      <h1>Find Friends</h1>
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card-message">
            <img src={wallpaper} alt={user.username} />
            <div className="user-info-message">
              <h2>{user.username}</h2>
              <p>{user.bio}</p>
            </div>
            <button onClick={() => handleFollowUser(user.id)}>
              {user.is_followed ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriends;
