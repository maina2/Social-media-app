import { useState } from 'react';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { FaHeart, FaComment } from 'react-icons/fa';
import homephoto from '../Assets/peakpx (15).jpg';
import './home.css';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      text: 'Nature is always beautiful',
      likes: 5,
      comments: ['Cool post!', 'Great picture!'],
      image: { homephoto },
    },
    {
      text: 'Nature is always beautiful',
      likes: 10,
      comments: ['Awesome!', 'Nice shot!'],
      image: { homephoto },
    },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitPost = () => {
    if (inputValue.trim() !== '') {
      setPosts([...posts, { text: inputValue, likes: 0, comments: [], image: null }]);
      setInputValue('');
    }
  };

  const handleLikePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const handleAddComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <div className="home">
      <div className="post-input-container">
        <div className="post-picture">
          <div className="write-post">
            <div className="icon">
              <PiPencilSimpleLineDuotone />
            </div>
            <p>Write a post</p>
          </div>

          <div className="upload-post">
            <div className="icon">
              <HiOutlinePhoto />
            </div>
            <p>Upload a photo</p>
          </div>
        </div>
        <hr />
        <div className="post-text">
          <textarea
            className="post-input"
            placeholder="Write something here..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="submit-button" onClick={handleSubmitPost}>
            Post
          </button>
        </div>
      </div>

      <div className="post-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <div className="post-content">
              <div className="user-info">
                <img src={homephoto} alt="User" className="user-avatar" />
                <h3 className="user-name">Username</h3>
              </div>
              <p>{post.text}</p>
              {post.image && <img src={homephoto} alt="Post" />}
              <div className="post-actions">
                <div className="action" onClick={() => handleLikePost(index)}>
                  <FaHeart />
                  <span>{post.likes}</span>
                </div>
                <div className="action">
                  <FaComment />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
            <div className="comment-section">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(index, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              {post.comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  {comment}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
