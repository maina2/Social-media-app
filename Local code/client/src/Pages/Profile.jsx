import './profile.css';

const Profile = () => {
  const user = {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nulla at turpis vehicula interdum.',
    followers: 500,
    following: 300,
    profileImage: 'path-to-image',
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-page-image">
          <img src={user.profileImage} alt="Profile" />
          <button className="edit-profile-image-button">Edit</button>
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <div className="profile-stats">
            <div className="stat">
              <h3>Followers</h3>
              <p>{user.followers}</p>
            </div>
            <div className="stat">
              <h3>Following</h3>
              <p>{user.following}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-profile-button-container">
        <button className="edit-profile-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
