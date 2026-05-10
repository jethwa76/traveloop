export const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(amount) || 0);

export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return 'Dates TBD';
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

export const tripDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;
  const diff = new Date(endDate) - new Date(startDate);
  return Math.max(1, Math.round(diff / 86400000) + 1);
};

export const normalizeTrip = (trip) => ({
  destinations: [],
  itinerary: [],
  expenses: { transport: 0, hotels: 0, activities: 0, food: 0 },
  ...trip,
});

export const totalExpenses = (trip) => Object.values(trip?.expenses || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
