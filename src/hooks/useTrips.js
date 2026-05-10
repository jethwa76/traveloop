import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { deleteTrip, getTrips } from '../services/tripService';

export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrips = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getTrips(user.uid);
    setTrips(data);
    setLoading(false);
  }, [user]);

  useEffect(() => { loadTrips(); }, [loadTrips]);

  const removeTrip = async (tripId) => {
    await deleteTrip(tripId);
    setTrips((current) => current.filter((trip) => trip.id !== tripId));
  };

  return { trips, loading, reload: loadTrips, removeTrip };
}
