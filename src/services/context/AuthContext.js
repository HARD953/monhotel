"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getLoginInfos } from '@/api/users/users';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


 
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (status === "authenticated" && session) {
        setIsAuthenticated(true);

        try {
          const response = await getLoginInfos()
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [status, session]);



  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
