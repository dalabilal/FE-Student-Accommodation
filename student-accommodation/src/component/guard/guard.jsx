// Guard.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../service/UserContext';

const Guard = ({ children, permittedRoles }) => {
  const userrole = sessionStorage.getItem('userRole');
  if (!userrole) {
    return <Navigate to="/*" />;
  } else if (permittedRoles && !permittedRoles.includes(userrole)) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default Guard;
