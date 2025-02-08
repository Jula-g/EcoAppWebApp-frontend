import React, { createContext, useContext, useState, useEffect } from 'react';
import { EcoWebClient } from './EcoWebClient';

type User = {
  email: string;
  lastName: string;
  name: string;
  id: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const client = new EcoWebClient();

  // Function to persist login state
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { userData, token } = await client.login(username, password);
      console.log('User data:', userData);

      // validate token
      const isTokenValid = await client.verifyToken(token);

      if (!isTokenValid) {
        Copy-new-damian
        console.error('Invalid token received, logging out...');

        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        return false;
      }

      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(user)); // Save user in localStorage
      console.log('User logged in:', user);
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
    setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    console.log('User logged out');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User session restored:', JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
