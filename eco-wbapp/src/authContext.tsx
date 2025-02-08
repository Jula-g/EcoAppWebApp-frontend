import React, { createContext, useContext, useState, useEffect } from 'react';
import { EcoWebClient } from './EcoWebClient';

type User = {
  email: string;
  lastName: string;
  name: string;
  id: string;
};

type AuthContextType = {
  // user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<User | null>(null);
  const client = new EcoWebClient();

  // Function to persist login state
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { userData, token } = await client.login(username, password);
      console.log('API response:', { userData, token });
      console.log('User data:', userData);

      // validate token
      const isTokenValid = await client.verifyToken(token);

      if (!isTokenValid) {
        console.error('Invalid token received, logging out...');
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        return false;
      }

      // setUser(userData);
      console.log('User logged in:', userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
      return false;
    }
  };

  const logout = () => {
    client.logout();
    // setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    console.log('User logged out');
  };

  useEffect(() => {
    localStorage.clear();
    const storedUser = localStorage.getItem('authUser');
    console.log('Stored user:', storedUser);
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      console.log('User session restored:', JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
