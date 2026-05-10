import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/firebase.js";

const TRIP_KEY_PREFIX = "traveloop-trips";
const SHARE_KEY = "traveloop-shared-trips";

function localTripKey(userId) {
  return `${TRIP_KEY_PREFIX}:${userId || "demo-user"}`;
}

function ensureLocalTrips(userId) {
  const key = localTripKey(userId);
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);

  localStorage.setItem(key, JSON.stringify([]));
  return [];
}

function saveLocalTrips(userId, trips) {
  localStorage.setItem(localTripKey(userId), JSON.stringify(trips));
}

function normalizeTrip(docSnapshot) {
  return { id: docSnapshot.id, ...docSnapshot.data() };
}

export function subscribeToTrips(userId, callback, onError) {
  if (!isFirebaseConfigured) {
    // Call synchronously — localStorage is instant, no timeout needed
    callback(ensureLocalTrips(userId));
    return () => {};
  }

  const tripsQuery = query(collection(db, "users", userId, "trips"), orderBy("createdAt", "desc"));
  return onSnapshot(
    tripsQuery,
    (snapshot) => {
      callback(snapshot.docs.map(normalizeTrip));
    },
    (error) => {
      console.error("Firestore trips subscription error:", error);
      if (onError) onError(error);
    },
  );
}

export async function listTrips(userId) {
  if (!isFirebaseConfigured) return ensureLocalTrips(userId);

  const tripsQuery = query(collection(db, "users", userId, "trips"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(tripsQuery);
  return snapshot.docs.map(normalizeTrip);
}

export async function getTrip(userId, tripId) {
  if (!isFirebaseConfigured) {
    return ensureLocalTrips(userId).find((trip) => trip.id === tripId) ?? null;
  }

  const snapshot = await getDoc(doc(db, "users", userId, "trips", tripId));
  return snapshot.exists() ? normalizeTrip(snapshot) : null;
}

export async function createTrip(userId, payload) {
  const now = new Date().toISOString();
  const trip = {
    ...payload,
    createdAt: now,
    updatedAt: now,
    ownerId: userId,
    isShared: false,
  };

  if (!isFirebaseConfigured) {
    const trips = ensureLocalTrips(userId);
    const localTrip = { ...trip, id: crypto.randomUUID() };
    saveLocalTrips(userId, [localTrip, ...trips]);
    return localTrip;
  }

  const ref = await addDoc(collection(db, "users", userId, "trips"), trip);
  return { id: ref.id, ...trip };
}

export async function updateTrip(userId, tripId, payload) {
  const updates = { ...payload, updatedAt: new Date().toISOString() };

  if (!isFirebaseConfigured) {
    const trips = ensureLocalTrips(userId).map((trip) => (trip.id === tripId ? { ...trip, ...updates } : trip));
    saveLocalTrips(userId, trips);
    return trips.find((trip) => trip.id === tripId);
  }

  await updateDoc(doc(db, "users", userId, "trips", tripId), updates);
  return { id: tripId, ...updates };
}

export async function deleteTrip(userId, tripId) {
  if (!isFirebaseConfigured) {
    const trips = ensureLocalTrips(userId).filter((trip) => trip.id !== tripId);
    saveLocalTrips(userId, trips);
    return;
  }

  await deleteDoc(doc(db, "users", userId, "trips", tripId));
}

export async function shareTrip(userId, tripId) {
  const trip = await getTrip(userId, tripId);
  if (!trip) throw new Error("Trip not found");
  const publicTrip = { ...trip, sharedAt: new Date().toISOString(), isShared: true };

  if (!isFirebaseConfigured) {
    const shared = JSON.parse(localStorage.getItem(SHARE_KEY) || "{}");
    localStorage.setItem(SHARE_KEY, JSON.stringify({ ...shared, [tripId]: publicTrip }));
    await updateTrip(userId, tripId, { isShared: true });
    return publicTrip;
  }

  await setDoc(doc(db, "sharedTrips", tripId), publicTrip);
  await updateTrip(userId, tripId, { isShared: true });
  return publicTrip;
}

export async function getSharedTrip(tripId) {
  if (!isFirebaseConfigured) {
    const shared = JSON.parse(localStorage.getItem(SHARE_KEY) || "{}");
    if (shared[tripId]) return shared[tripId];

    const demoTrips = ensureLocalTrips("demo-user");
    return demoTrips.find((trip) => trip.id === tripId) ?? null;
  }

  const snapshot = await getDoc(doc(db, "sharedTrips", tripId));
  return snapshot.exists() ? normalizeTrip(snapshot) : null;
}
