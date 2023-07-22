import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import backgroundImage from '../Assets/peakpx (13).jpg'

const SignIn = ({ handleSignInSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Perform sign-in logic here

    // Simulating a successful sign-in for this example
    // In a real application, you would handle the authentication process properly
    // and redirect the user to the appropriate page

    // Save the user's authentication status to localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    // Call the handleSignInSuccess function to update the isLoggedIn state in the App component
    handleSignInSuccess();

    // After successful sign-in, redirect to the home page (handled by the App component)
    navigate('/home');
  };

  return (
    <div className="signin-container">
      <div className="left-half">
        {/* Replace the URL below with the path to your image */}
        <img src={backgroundImage} alt="Sign In" />
      </div>
      <div className="right-half">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
