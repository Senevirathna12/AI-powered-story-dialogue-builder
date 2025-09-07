"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is already signed in (from localStorage)
    const savedAuth = localStorage.getItem('ai-story-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const signIn = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          name: 'John Doe',
          email: 'john.doe@example.com'
        };
        
        setIsAuthenticated(true);
        setUser(mockUser);
        
        // Save to localStorage
        localStorage.setItem('ai-story-auth', JSON.stringify({ user: mockUser }));
        
        resolve();
      }, 2000); // Simulate network delay
    });
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('ai-story-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}