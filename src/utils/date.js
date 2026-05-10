export function formatDate(dateValue, options = {}) {
  if (!dateValue) return "Not set";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) return "Dates pending";
  return `${formatDate(startDate, { year: undefined })} - ${formatDate(endDate)}`;
}

export function getTripDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.round(diff / 86400000) + 1);
}

export function getDateForDay(startDate, day) {
  if (!startDate) return "";
  const date = new Date(`${startDate}T00:00:00`);
  date.setDate(date.getDate() + day - 1);
  return date.toISOString().slice(0, 10);
}

export function isUpcoming(startDate) {
  if (!startDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${startDate}T00:00:00`) >= today;
}
