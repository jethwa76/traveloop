export const budgetCategories = [
  { name: 'Transport', value: 980, color: '#06b6d4' },
  { name: 'Hotels', value: 1640, color: '#6366f1' },
  { name: 'Activities', value: 720, color: '#f43f5e' },
  { name: 'Food', value: 560, color: '#f59e0b' },
];

export const expenseTrend = [
  { day: 'Day 1', planned: 420, actual: 380 },
  { day: 'Day 2', planned: 610, actual: 640 },
  { day: 'Day 3', planned: 520, actual: 490 },
  { day: 'Day 4', planned: 760, actual: 710 },
  { day: 'Day 5', planned: 450, actual: 430 },
];

export const demoTrips = [
  {
    id: 'demo-paris',
    name: 'Paris Design Sprint',
    destinations: ['Paris', 'Versailles'],
    startDate: '2026-06-18',
    endDate: '2026-06-24',
    budget: 3900,
    description: 'Museums, neighborhoods, pastry walks, and a little product strategy retreat.',
    cover: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    status: 'Upcoming',
    public: true,
    expenses: { transport: 920, hotels: 1500, activities: 690, food: 540 },
    itinerary: [
      { day: 1, title: 'Arrive & riverside reset', city: 'Paris', activities: ['Check in near Le Marais', 'Sunset walk along the Seine'], notes: 'Book airport train ahead.' },
      { day: 2, title: 'Culture loop', city: 'Paris', activities: ['Louvre highlights', 'Café de Flore lunch', 'Montmartre golden hour'], notes: 'Keep afternoon flexible.' },
      { day: 3, title: 'Versailles day trip', city: 'Versailles', activities: ['Palace gardens', 'Picnic by Grand Canal'], notes: 'Pack water and comfortable shoes.' },
    ],
  },
  {
    id: 'demo-kyoto',
    name: 'Kyoto Slow Travel',
    destinations: ['Kyoto', 'Nara', 'Osaka'],
    startDate: '2026-09-05',
    endDate: '2026-09-15',
    budget: 5200,
    description: 'Temples, tea houses, gardens, and thoughtful food stops across Kansai.',
    cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    status: 'Planning',
    public: true,
    expenses: { transport: 1180, hotels: 2200, activities: 890, food: 930 },
    itinerary: [
      { day: 1, title: 'Gion welcome walk', city: 'Kyoto', activities: ['Machiya check-in', 'Yasaka Shrine evening stroll'], notes: 'Reserve dinner near Pontocho.' },
      { day: 2, title: 'Arashiyama morning', city: 'Kyoto', activities: ['Bamboo grove sunrise', 'Tenryu-ji gardens', 'Katsura River lunch'], notes: 'Go early to avoid crowds.' },
    ],
  },
];

export const testimonials = [
  { name: 'Maya Chen', role: 'Product Lead', quote: 'Traveloop turned our chaotic group trip into a clean plan everyone could follow.' },
  { name: 'Jon Bell', role: 'Founder', quote: 'The budget visuals make it instantly obvious where the money is going.' },
  { name: 'Priya Shah', role: 'Designer', quote: 'It feels premium, but the workflow is simple enough for a weekend getaway.' },
];
