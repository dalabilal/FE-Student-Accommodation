import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState('');
  const token = sessionStorage.getItem('jwtToken');
  const [noUser, setNoUser] = useState(token ? true : false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerify, setEmailVerify] = useState('');
  const [housingData, setHousingData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const userrole = sessionStorage.getItem('userRole');
    if (token) {
      setUserRole(userrole); 
    }
  }, [userRole]);

  useEffect(() => {
    // Fetch housing data from the backend
    const fetchHousingData = async () => {
      try {
        const response = await fetch('http://localhost:3005/all/housing');
        if (response.ok) {
          const data = await response.json();
          setHousingData(data);
        } else {
          console.error('Failed to fetch housing data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchHousingData();
  }, [housingData]);
  const logoutUser = () => {
    setUserRole(null);
    setNoUser(false)
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userID');
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <UserContext.Provider value={{
      noUser, userRole,
     logoutUser ,setUserRole ,
     setNoUser , verificationCode ,
     setVerificationCode, emailVerify,
     setEmailVerify,userId,setUserId,
     housingData, setHousingData
     }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
