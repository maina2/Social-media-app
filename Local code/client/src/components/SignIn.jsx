// SignIn.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css';
import backgroundImage from '../Assets/peakpx (13).jpg';
import { AppContext } from '../AppContext';

const SignIn = () => {
  const { setIsLoggedIn, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:8081/auth/login', formData);

      // Extract user information and token from the response
      const { id, username, email, token } = response.data;

      // Save the token to local storage (you can also use cookies for this)
      localStorage.setItem('token', token);

      // Update the isLoggedIn state using setIsLoggedIn
      setIsLoggedIn(true);

      // Set the current user using setCurrentUser
      setCurrentUser({ id, username, email });

      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle authentication error, show a message, etc.
    }
  };

  return (
    <div className="signin-container">
      <div className="left-half">
        <img src={backgroundImage} alt="Sign In" />
      </div>
      <div className="right-half">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          {/* Add email input field */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <div className="register-link">
          <p>
            Dont have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
