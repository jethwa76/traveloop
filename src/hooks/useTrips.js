import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import {
  createTrip,
  deleteTrip,
  listTrips,
  shareTrip,
  subscribeToTrips,
  updateTrip,
} from "../services/tripService.js";

export function useTrips() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshLocalTrips = useCallback(async () => {
    if (!user?.uid) return;
    setTrips(await listTrips(user.uid));
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) {
      setTrips([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribe = subscribeToTrips(user.uid, (items) => {
      setTrips(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [user?.uid]);

  const addTrip = useCallback(
    async (payload) => {
      const trip = await createTrip(user.uid, payload);
      await refreshLocalTrips();
      showToast({ type: "success", title: "Trip created", message: `${trip.name} is ready to plan.` });
      return trip;
    },
    [refreshLocalTrips, showToast, user?.uid],
  );

  const saveTrip = useCallback(
    async (tripId, payload) => {
      const trip = await updateTrip(user.uid, tripId, payload);
      await refreshLocalTrips();
      showToast({ type: "success", title: "Trip updated", message: "Your changes were saved." });
      return trip;
    },
    [refreshLocalTrips, showToast, user?.uid],
  );

  const removeTrip = useCallback(
    async (tripId) => {
      await deleteTrip(user.uid, tripId);
      await refreshLocalTrips();
      showToast({ type: "success", title: "Trip deleted", message: "The trip was removed from your planner." });
    },
    [refreshLocalTrips, showToast, user?.uid],
  );

  const publishTrip = useCallback(
    async (tripId) => {
      const trip = await shareTrip(user.uid, tripId);
      await refreshLocalTrips();
      showToast({ type: "success", title: "Share link ready", message: "Your public itinerary has been updated." });
      return trip;
    },
    [refreshLocalTrips, showToast, user?.uid],
  );

  return {
    trips,
    loading,
    addTrip,
    saveTrip,
    removeTrip,
    publishTrip,
    refreshTrips: refreshLocalTrips,
  };
}
