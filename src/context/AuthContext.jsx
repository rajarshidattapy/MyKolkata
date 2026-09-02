import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { isSignedIn, signOut } = useClerkAuth();
  const { user } = useUser();
  const router = useRouter();
  const previousAuthState = useRef(isSignedIn);

  useEffect(() => {
    // Only redirect when user transitions from not signed in to signed in
    // and they're on an auth page
    if (isSignedIn && !previousAuthState.current && user) {
      const authPages = ['/', '/login', '/signup'];

      if (authPages.includes(router.pathname)) {
        console.log('Redirecting newly signed in user to /home');
        router.push('/home');
      }
    }

    previousAuthState.current = isSignedIn;
  }, [isSignedIn, user, router]);

  const logout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: isSignedIn,
      user,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
