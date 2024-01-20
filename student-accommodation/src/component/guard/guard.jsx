// Guard.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../service/UserContext';

const Guard = ({ children, permittedRoles }) => {
  const { userRole } = useContext(UserContext);
  if (!userRole) {
    return <Navigate to="/signin" />;
  } else if (permittedRoles && !permittedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect to home page or another suitable page
  } else {
    return children;
  }
};

export default Guard;
