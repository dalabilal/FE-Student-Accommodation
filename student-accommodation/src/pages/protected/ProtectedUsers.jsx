// ProtectedUsers.js

import React, { useEffect } from 'react';
import { useUser } from '../../service/UserContext';
import Users from '../AllUsers/Users';
import { useNavigate } from 'react-router-dom';

const ProtectedUsers = () => {
  const { userRole } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'owner') {
      navigate('/');
    }
  }, [userRole, navigate]);
  // Check if the user has the required role
  if (userRole !== 'owner') {
    // Redirect to another page or show an error message
    return null;
  }

  return <Users />;
};

export default ProtectedUsers;
