// ProtectedUsers.js

import React, { useEffect } from 'react';
import { useUser } from '../../service/UserContext';
import Users from '../AllUsers/Users';
import { useNavigate } from 'react-router-dom';

const ProtectedUsers = () => {
  const { userRole , noUser} = useUser();
  const navigate = useNavigate();
  console.log(userRole);

  useEffect(() => {
    if (userRole !== 'owner') {
      navigate('*');
    }
  }, [userRole, navigate]);

  if (userRole !== 'owner' && noUser) {
    return null;
  }
  return <Users />
};

export default ProtectedUsers;
