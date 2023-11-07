import  { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext'; // Import the AppContext

const Logout = () => {
  const { setIsLoggedIn } = useContext(AppContext); // Access setIsLoggedIn from the context
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false); // Update the isLoggedIn state using setIsLoggedIn
    navigate('/signin');
  }, [setIsLoggedIn, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
