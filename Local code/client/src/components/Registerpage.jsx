import { Link } from 'react-router-dom';
import './register.css';
import BackgroundImage from '../Assets/peakpx (13).jpg'

const Register = () => {
  return (
    <div className="register-container">
      <div className="left-half" style={{ backgroundColor: '#83C191' }}>
        {/* Add your image here */}
        <img src={BackgroundImage} alt="Image" />
      </div>
      <div className="right-half">
        <h2>Register</h2>
        <form>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" required />

          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" required />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

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
