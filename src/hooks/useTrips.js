import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import {
  createTrip,
  deleteTrip,
  shareTrip,
  subscribeToTrips,
  updateTrip,
} from "../services/tripService.js";

export function useTrips() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [trips, setTrips] = useState([]);
  // Start false — only go true when we actually have a uid and are fetching
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setTrips([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribe = subscribeToTrips(
      user.uid,
      (items) => {
        setTrips(items);
        setLoading(false);
      },
      () => {
        // On Firestore error, stop loading so the UI never freezes
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user?.uid]);

  const addTrip = useCallback(
    async (payload) => {
      const trip = await createTrip(user.uid, payload);
      // onSnapshot updates trips automatically for Firebase mode.
      // For demo mode, sync state directly since there is no live listener.
      setTrips((current) => [trip, ...current.filter((t) => t.id !== trip.id)]);
      showToast({ type: "success", title: "Trip created", message: `${trip.name} is ready to plan.` });
      return trip;
    },
    [showToast, user?.uid],
  );

  const saveTrip = useCallback(
    async (tripId, payload) => {
      const trip = await updateTrip(user.uid, tripId, payload);
      setTrips((current) => current.map((t) => (t.id === tripId ? { ...t, ...payload } : t)));
      showToast({ type: "success", title: "Trip updated", message: "Your changes were saved." });
      return trip;
    },
    [showToast, user?.uid],
  );

  const removeTrip = useCallback(
    async (tripId) => {
      await deleteTrip(user.uid, tripId);
      setTrips((current) => current.filter((t) => t.id !== tripId));
      showToast({ type: "success", title: "Trip deleted", message: "The trip was removed from your planner." });
    },
    [showToast, user?.uid],
  );

  const publishTrip = useCallback(
    async (tripId) => {
      const trip = await shareTrip(user.uid, tripId);
      setTrips((current) => current.map((t) => (t.id === tripId ? { ...t, isShared: true } : t)));
      showToast({ type: "success", title: "Share link ready", message: "Your public itinerary has been updated." });
      return trip;
    },
    [showToast, user?.uid],
  );

  return {
    trips,
    loading,
    addTrip,
    saveTrip,
    removeTrip,
    publishTrip,
  };
}
