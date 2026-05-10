import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth, isFirebaseConfigured } from "../firebase/firebase.js";

const AuthContext = createContext(null);
const DEMO_USER_KEY = "traveloop-demo-user";

const demoUser = {
  uid: "demo-user",
  displayName: "Demo Traveler",
  email: "demo@traveloop.app",
};

function readDemoUser() {
  const saved = localStorage.getItem(DEMO_USER_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setUser(readDemoUser());
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (email, password) => {
    if (!isFirebaseConfigured) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ ...demoUser, email }));
      setUser({ ...demoUser, email });
      return { demoMode: true };
    }

    await signInWithEmailAndPassword(auth, email, password);
    return { demoMode: false };
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    if (!isFirebaseConfigured) {
      const localUser = { ...demoUser, displayName: name || demoUser.displayName, email };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(localUser));
      setUser(localUser);
      return { demoMode: true };
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(credential.user, { displayName: name });
    setUser({ ...credential.user, displayName: name || credential.user.displayName });
    return { demoMode: false };
  }, []);

  const logout = useCallback(async () => {
    if (!isFirebaseConfigured) {
      localStorage.removeItem(DEMO_USER_KEY);
      setUser(null);
      return;
    }

    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      isDemoMode: !isFirebaseConfigured,
    }),
    [loading, login, logout, signup, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
