import React, { useState } from 'react';
import './profile.css';
import wallpaper from '../Assets/peakpx (6).jpg';

const Profile = () => {
  // Sample user data
  const initialUser = {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nulla at turpis vehicula interdum.',
    followers: 500,
    following: 300,
    profileImage: wallpaper,
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...initialUser });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUser({ ...user });
    setSelectedImage(null); // Clear the selected image when canceling edit
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setEditedUser((prevUser) => ({ ...prevUser, profileImage: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-page-image">
          <img src={editMode ? editedUser.profileImage : user.profileImage} alt="Profile" />
          {editMode && (
            <>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload" className="edit-profile-image-button">
                Choose Image
              </label>
            </>
          )}
        </div>
        <div className="profile-info">
          {!editMode ? (
            <h2>{user.name}</h2>
          ) : (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          )}
          {!editMode ? (
            <p>{user.bio}</p>
          ) : (
            <textarea
              name="bio"
              value={editedUser.bio}
              onChange={handleInputChange}
            />
          )}
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
        {editMode ? (
          <>
            <button className="save-profile-button" onClick={handleSaveProfile}>
              Save
            </button>
            <button className="cancel-edit-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
