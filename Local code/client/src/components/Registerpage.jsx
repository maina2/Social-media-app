import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import BackgroundImage from '../Assets/peakpx (13).jpg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '', // Add email field here
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/auth/signup', formData);
      console.log(response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="left-half" style={{ backgroundColor: '#83C191' }}>
        <img src={BackgroundImage} alt="Image" />
      </div>
      <div className="right-half">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleInputChange} required />

          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} required />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

          {/* Add email input field */}
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

          <button type="submit" style={{ backgroundColor: '#83C191' }}>Register</button>
        </form>
        <div className="signin-link">
          <p>
            Already have an account? <Link to="/signin">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
