// UserContext.js

import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the authentication token exists in localStorage
    const token = sessionStorage.getItem('jwtToken');
    const userrole = sessionStorage.getItem('userRole');
    console.log("token", token);
    console.log("userRole", userrole);
    if (token) {
      // If token exists, set the user role
      setUserRole(userrole); // Replace 'yourUserRole' with the actual user role
    }
  }, [userRole]);


  const logoutUser = () => {
    // Clear user role, remove the token from localStorage, and delete the cookie
    setUserRole(null);
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userRole');
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <UserContext.Provider value={{ userRole, logoutUser ,setUserRole}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
