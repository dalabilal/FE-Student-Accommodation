// Guard.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../service/UserContext';

const Guard = ({ children, permittedRoles }) => {
  const { userRole } = useContext(UserContext);
  console.log("user" , userRole);
  if (!userRole) {
    return <Navigate to="/*" />;
  } else if (permittedRoles && !permittedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default Guard;
