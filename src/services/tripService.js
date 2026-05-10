import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase/firebase';
import { demoTrips } from '../data/mockData';

const collectionName = 'trips';
const localKey = 'traveloop-demo-trips';

const readLocalTrips = () => {
  try {
    return JSON.parse(localStorage.getItem(localKey)) || [];
  } catch {
    return [];
  }
};

const writeLocalTrips = (trips) => localStorage.setItem(localKey, JSON.stringify(trips));
const demoWorkspaceTrips = () => [...readLocalTrips(), ...demoTrips];

export const getTrips = async (userId) => {
  if (!hasFirebaseConfig || !userId) return demoWorkspaceTrips();
  const q = query(collection(db, collectionName), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const getTrip = async (tripId, userId) => {
  if (!hasFirebaseConfig) return demoWorkspaceTrips().find((trip) => trip.id === tripId) || null;
  const ref = doc(db, collectionName, tripId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  const data = { id: snapshot.id, ...snapshot.data() };
  return data.userId === userId || data.public ? data : null;
};

export const createTrip = async (trip, userId) => {
  if (!hasFirebaseConfig || !userId) {
    const created = { id: crypto.randomUUID(), public: true, createdAt: new Date().toISOString(), ...trip };
    writeLocalTrips([created, ...readLocalTrips()]);
    return created;
  }
  const docRef = await addDoc(collection(db, collectionName), {
    ...trip,
    userId,
    public: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...trip };
};

export const updateTrip = async (tripId, updates) => {
  if (!hasFirebaseConfig) {
    writeLocalTrips(readLocalTrips().map((trip) => (trip.id === tripId ? { ...trip, ...updates, updatedAt: new Date().toISOString() } : trip)));
    return;
  }
  if (tripId.startsWith('demo-')) return;
  await updateDoc(doc(db, collectionName, tripId), { ...updates, updatedAt: serverTimestamp() });
};

export const deleteTrip = async (tripId) => {
  if (!hasFirebaseConfig) {
    writeLocalTrips(readLocalTrips().filter((trip) => trip.id !== tripId));
    return;
  }
  if (tripId.startsWith('demo-')) return;
  await deleteDoc(doc(db, collectionName, tripId));
};
