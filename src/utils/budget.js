export const budgetCategories = [
  { key: "transport", label: "Transport", color: "#2f80ed" },
  { key: "hotels", label: "Hotels", color: "#19a7a8" },
  { key: "activities", label: "Activities", color: "#ff7a59" },
  { key: "food", label: "Food", color: "#63d6ad" },
];

export function currency(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function buildBudgetFromEstimate(estimatedBudget = 0) {
  const total = Number(estimatedBudget) || 0;
  return {
    transport: Math.round(total * 0.25),
    hotels: Math.round(total * 0.38),
    activities: Math.round(total * 0.17),
    food: Math.max(0, total - Math.round(total * 0.25) - Math.round(total * 0.38) - Math.round(total * 0.17)),
  };
}

export function getBudgetTotal(budget = {}) {
  return budgetCategories.reduce((sum, item) => sum + (Number(budget[item.key]) || 0), 0);
}

export function getBudgetChartData(trip) {
  return budgetCategories.map((category) => ({
    name: category.label,
    value: Number(trip?.budget?.[category.key]) || 0,
    color: category.color,
  }));
}

export function getActivitySpend(trip) {
  return (trip?.itinerary ?? []).flatMap((day) =>
    (day.activities ?? []).map((activity) => ({
      day: `Day ${day.day}`,
      category: activity.category || "Activities",
      cost: Number(activity.cost) || 0,
    })),
  );
}

export function getDailyBudgetData(trip) {
  const fallback = Number(trip?.estimatedBudget) || getBudgetTotal(trip?.budget);
  const itinerary = trip?.itinerary ?? [];
  if (!itinerary.length) {
    return [{ day: "Planned", cost: fallback }];
  }

  return itinerary.map((day) => ({
    day: `Day ${day.day}`,
    cost: (day.activities ?? []).reduce((sum, activity) => sum + (Number(activity.cost) || 0), 0),
  }));
}

export function summarizeTrips(trips = []) {
  const estimated = trips.reduce((sum, trip) => sum + (Number(trip.estimatedBudget) || 0), 0);
  const planned = trips.reduce((sum, trip) => sum + getBudgetTotal(trip.budget), 0);
  const activities = trips.reduce(
    (sum, trip) =>
      sum +
      (trip.itinerary ?? []).reduce(
        (daySum, day) =>
          daySum + (day.activities ?? []).reduce((activitySum, activity) => activitySum + (Number(activity.cost) || 0), 0),
        0,
      ),
    0,
  );

  return { estimated, planned, activities };
}
