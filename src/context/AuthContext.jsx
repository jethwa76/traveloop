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
const DEMO_PROFILES_KEY = "traveloop-demo-profiles";

const demoUser = {
  uid: "demo-user",
  displayName: "Demo Traveler",
  email: "demo@traveloop.app",
};

function readDemoUser() {
  const saved = localStorage.getItem(DEMO_USER_KEY);
  return saved ? JSON.parse(saved) : null;
}

function saveProfile(email, displayName) {
  const profiles = JSON.parse(localStorage.getItem(DEMO_PROFILES_KEY) || "{}");
  profiles[email] = displayName;
  localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(profiles));
}

function getProfile(email) {
  const profiles = JSON.parse(localStorage.getItem(DEMO_PROFILES_KEY) || "{}");
  return profiles[email] || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const stored = readDemoUser();
      if (stored) {
        // If the stored session has the generic fallback name, try to restore
        // the real name from the profiles registry (handles stale sessions)
        const resolvedName = getProfile(stored.email) || stored.displayName;
        const resolved = resolvedName !== stored.displayName
          ? { ...stored, displayName: resolvedName }
          : stored;
        if (resolvedName !== stored.displayName) {
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify(resolved));
        }
        setUser(resolved);
      } else {
        setUser(null);
      }
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
      const displayName = getProfile(email) || demoUser.displayName;
      const localUser = { ...demoUser, email, displayName };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(localUser));
      setUser(localUser);
      return { demoMode: true };
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    // Set user immediately so ProtectedRoute sees a valid user before navigation.
    // onAuthStateChanged will also fire and sync — no conflict.
    setUser(credential.user);
    return { demoMode: false };
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    if (!isFirebaseConfigured) {
      const displayName = name || demoUser.displayName;
      saveProfile(email, displayName);
      const localUser = { ...demoUser, displayName, email };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(localUser));
      setUser(localUser);
      return { demoMode: true };
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(credential.user, { displayName: name });
    // Use the live Firebase User object directly — spreading it loses prototype
    // methods and can cause the Firestore SDK to not attach the auth token correctly.
    setUser(credential.user);
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
