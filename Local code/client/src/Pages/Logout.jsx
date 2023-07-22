import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here

    // For example, you can clear the user's authentication status from localStorage
    localStorage.removeItem('user');

    // After logging out, redirect to the Sign In page
    navigate('/signin');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
