import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const userrole = sessionStorage.getItem('userRole');
    if (token) {
      setUserRole(userrole); 
    }
  }, [userRole]);


  const logoutUser = () => {
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
