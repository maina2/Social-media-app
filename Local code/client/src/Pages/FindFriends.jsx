import { useState } from 'react';
import './findfriends.css';
import wallpaper from '../Assets/peakpx (14).jpg';

const FindFriends = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', image: { wallpaper }, following: false, description: 'Passionate traveler and foodie' },
    { id: 2, name: 'Jane Smith', image: { wallpaper }, following: false, description: 'Aspiring artist and music lover' },
    { id: 3, name: 'Mike Johnson', image: { wallpaper }, following: false, description: 'Fitness enthusiast and outdoor adventurer' },
    { id: 4, name: 'Emily Brown', image: { wallpaper }, following: false, description: 'Bookworm and coffee addict' },
    { id: 5, name: 'Alex Wilson', image: { wallpaper }, following: false, description: 'Tech geek and gaming enthusiast' },
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
          <div key={user.id} className="user-card-message">
            <img src={wallpaper} alt={user.name} />
            <div className="user-info-message">
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
