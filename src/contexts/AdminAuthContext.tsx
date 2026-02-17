import React, { createContext, useContext, useState, useCallback } from 'react';
import { getBackendUrl } from '@/config';

const ADMIN_TOKEN_KEY = 'kiora_admin_token';

type AdminAuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(ADMIN_TOKEN_KEY));

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const backendUrl = getBackendUrl();
    try {
      const res = await fetch(`${backendUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        setToken(data.token);
        return true;
      }
      if (res.status === 404) {
        console.error('Admin login endpoint not found (404). Start the backend from kiora_backend/backend.');
      }
      return false;
    } catch (e) {
      console.error('Admin login request failed:', e);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  }, []);

  const value: AdminAuthContextType = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}
