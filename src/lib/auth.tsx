import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isPatreonConnected: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  connectPatreon: (email: string, password: string) => Promise<boolean>;
}

interface User {
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes, automatically set users as authenticated
const DEMO_MODE = true;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage for persistence across refreshes
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (DEMO_MODE) return true; // Always authenticated in demo mode
    const saved = localStorage.getItem('isAuthenticated');
    return saved === 'true' ? true : false;
  });
  
  const [isPatreonConnected, setIsPatreonConnected] = useState(() => {
    if (DEMO_MODE) return true; // Always connected in demo mode
    const saved = localStorage.getItem('isPatreonConnected');
    return saved === 'true' ? true : false;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    if (DEMO_MODE) {
      return {
        email: 'demo@creatorcap.com',
        name: 'Demo User',
      };
    }
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('isPatreonConnected', isPatreonConnected.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, isPatreonConnected, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation for the dummy account
    if (email === 'demo@rentcapital.com' && password) {
      setIsAuthenticated(true);
      setUser({
        email,
        name: 'Test Creator',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsPatreonConnected(false);
    setUser(null);
    // Clear localStorage on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isPatreonConnected');
    localStorage.removeItem('user');
  };

  const connectPatreon = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsPatreonConnected(true);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPatreonConnected,
        user,
        login,
        logout,
        connectPatreon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 