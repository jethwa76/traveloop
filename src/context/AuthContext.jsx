import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../firebase/firebase';

const AuthContext = createContext(null);
const demoUser = { uid: 'demo-user', displayName: 'Alex Traveler', email: 'demo@traveloop.app' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (hasFirebaseConfig ? null : demoUser));
  const [loading, setLoading] = useState(hasFirebaseConfig);

  useEffect(() => {
    if (!hasFirebaseConfig) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!hasFirebaseConfig) return setUser({ ...demoUser, email });
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (name, email, password) => {
    if (!hasFirebaseConfig) return setUser({ ...demoUser, displayName: name, email });
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    setUser({ ...credential.user, displayName: name });
    return credential;
  };

  const logout = async () => {
    if (!hasFirebaseConfig) return setUser(null);
    return signOut(auth);
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout, hasFirebaseConfig }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
