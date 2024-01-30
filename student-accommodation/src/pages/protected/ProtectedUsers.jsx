// ProtectedUsers.js

import React, { useEffect } from 'react';
import { useUser } from '../../service/UserContext';
import Users from '../AllUsers/Users';
import { useNavigate } from 'react-router-dom';

const ProtectedUsers = () => {
  const { noUser} = useUser();
  const navigate = useNavigate();
  const userrole = sessionStorage.getItem('userRole');

    if (userrole !== 'owner' && noUser) {
      navigate('/*');
    } else {
      return <Users />
    }

};

export default ProtectedUsers;
