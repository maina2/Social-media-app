import React, { useState } from 'react';
import './findfriends.css';

const FindFriends = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', image: 'path-to-image', following: false, description: 'Passionate traveler and foodie' },
    { id: 2, name: 'Jane Smith', image: 'path-to-image', following: false, description: 'Aspiring artist and music lover' },
    { id: 3, name: 'Mike Johnson', image: 'path-to-image', following: false, description: 'Fitness enthusiast and outdoor adventurer' },
    { id: 4, name: 'Emily Brown', image: 'path-to-image', following: false, description: 'Bookworm and coffee addict' },
    { id: 5, name: 'Alex Wilson', image: 'path-to-image', following: false, description: 'Tech geek and gaming enthusiast' },
    // Add more users...
  ]);

  const handleFollowUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, following: !user.following } : user
      )
    );
  };

  return (
    <div className="find-friends-container">
      <h1>Find Friends</h1>
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.name} />
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.description}</p>
            </div>
            <button onClick={() => handleFollowUser(user.id)}>
              {user.following ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriends;
