"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const getBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.endsWith("/api") ? url : `${url}/api`;
};

const API_BASE = getBaseUrl();

interface AuthContextType {
  user: any;
  loading: boolean;
  activeStore: any;
  setActiveStore: (store: any) => void;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fetches full store details (with category, theme, etc.) for the given storeId.
 * This is needed so the storefront editor can resolve the correct preview URL.
 */
async function fetchFullStore(storeId: string, token: string) {
  try {
    const res = await fetch(`${API_BASE}/stores/${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      return data.store || null;
    }
  } catch (e) {
    console.warn("[AuthContext] Could not fetch full store data:", e);
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [activeStore, setActiveStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname() || "";

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      
      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          const savedStoreId = localStorage.getItem('active_store_id');
          if (parsedUser?.stores?.length > 0) {
            const foundStore = parsedUser.stores.find((s: any) => s.id === savedStoreId) || parsedUser.stores[0];
            
            // Fetch the full store to get category, theme, etc. for the editor
            const fullStore = await fetchFullStore(foundStore.id, token);
            setActiveStore(fullStore || foundStore);
          }
        } catch (e) {
          console.error("Failed to parse saved user");
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          if (!pathname.includes('/login')) {
             router.replace('/login');
          }
        }
      } else {
         setUser(null);
         setActiveStore(null);
         if (!pathname.includes('/login')) {
             router.replace('/login');
         }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    setUser(data.user);
    
    if (data.user?.stores?.length > 0) {
      const firstStore = data.user.stores[0];
      localStorage.setItem('active_store_id', firstStore.id);
      
      // Fetch full store details (category, theme, etc.)
      const fullStore = await fetchFullStore(firstStore.id, data.token);
      setActiveStore(fullStore || firstStore);
    }
  };


  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('active_store_id');
    setUser(null);
    setActiveStore(null);
    router.replace('/login');
  };

  const setStore = async (store: any) => {
    setActiveStore(store);
    if (store?.id) {
       localStorage.setItem('active_store_id', store.id);
       // Also fetch the full detail on store switch
       const token = localStorage.getItem('auth_token');
       if (token) {
         const fullStore = await fetchFullStore(store.id, token);
         if (fullStore) setActiveStore(fullStore);
       }
    }
  };

  return (
    <AuthContext.Provider value={{ user, activeStore, setActiveStore: setStore, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
