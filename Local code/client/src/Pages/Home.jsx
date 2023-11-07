import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { FaHeart, FaComment, FaTrash } from 'react-icons/fa';
import { AppContext } from '../AppContext';
import homephoto from '../Assets/peakpx (15).jpg';
import './home.css';
import moment from 'moment';

const Home = () => {
  const { isLoggedIn, user } = useContext(AppContext);
  const { id: userId } = user || {};


  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setUploadedImageURL(URL.createObjectURL(file));
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8081/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSubmitPost = () => {
    if (inputValue.trim() !== '') {
      const newPost = {
        text: inputValue,
        likes: 0,
        comments: [],
        image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      };

      setPosts((prevPosts) => [...prevPosts, newPost]);
      setInputValue('');
      setSelectedImage(null);
      setUploadedImageURL('');
    }
  };
  

  const handleLikePost = async (postId, index) => {
    try {
      const response = await axios.put(`http://localhost:8081/posts/${postId}/like`);
      const updatedPost = response.data;
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts[index] = updatedPost;
        return newPosts;
      });
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleAddComment = async (postId, index, comment) => {
    try {
      const response = await axios.post(`http://localhost:8081/comments/${postId}`, { comment });
      const updatedPost = response.data;
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts[index] = updatedPost;
        return newPosts;
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('DD/MM/yyyy HH:mm:ss');
  };

  return (
    <div className="home">
      <div className="post-input-container">
        <div className="post-picture">
          <label htmlFor="image-upload">
            <div className="write-post">
              <div className="icon">
                <PiPencilSimpleLineDuotone />
              </div>
              <p>Write a post</p>
            </div>
          </label>

          <label htmlFor="image-upload">
            <div className="upload-post">
              <div className="icon">
                <HiOutlinePhotograph />
              </div>
              <p>Upload a photo</p>
            </div>
          </label>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
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
        {uploadedImageURL && (
          <div className="image-preview">
            <img src={uploadedImageURL} alt="Preview" />
          </div>
        )}
      </div>

      <div className="post-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <div className="post-content">
              <div className="user-info">
                <img src={homephoto} alt="User" className="user-avatar" />
                <h3 className="user-name">{post.user_username}</h3> {/* Access username directly from the post object */}
              </div>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post" />}
              <div className="post-actions">
                <div className="action" onClick={() => handleLikePost(post.id, index)}>
                  <FaHeart />
                  <span>{post.likes}</span>
                </div>
                <div className="action">
                  <FaComment />
                  <span>{post.comments?.length}</span>
                </div>
                {isLoggedIn && (
                  <div className="action" onClick={() => handleDeletePost(post.id)}>
                    <FaTrash />
                  </div>
                )}
              </div>
            </div>
            <div className="comment-section">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(post.id, index, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              {post.comments?.map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  <img src={homephoto} alt="User" className="comment-avatar" />
                  <div className="comment-content">
                    <p className="comment-user">{comment.username}</p> {/* Display the username for the comment */}
                    <p className="comment-text">{comment.comment}</p>
                    <p className="comment-timestamp">{formatTimestamp(comment.timestamp)}</p>
                  </div>
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
