import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const token = sessionStorage.getItem('jwtToken');
  const [noUser, setNoUser] = useState(token ? true : false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerify, setEmailVerify] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const userrole = sessionStorage.getItem('userRole');
    if (token) {
      setUserRole(userrole); 
    }
  }, [userRole]);

  const logoutUser = () => {
    setUserRole(null);
    setNoUser(false)
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <UserContext.Provider value={{
      noUser, userRole,
     logoutUser ,setUserRole ,
     setNoUser , verificationCode ,
     setVerificationCode, showVerificationCodeInput,
     setShowVerificationCodeInput, emailVerify,
     setEmailVerify
     }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
