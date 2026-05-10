export const sampleTrips = [
  {
    id: "sample-golden-triangle",
    name: "Golden Triangle Escape",
    description: "Delhi's history, the Taj Mahal at sunrise, and Jaipur's pink-city bazaars.",
    startDate: "2026-12-20",
    endDate: "2026-12-27",
    destinations: ["Delhi", "Agra", "Jaipur"],
    estimatedBudget: 45000,
    budget: {
      transport: 8000,
      hotels: 18000,
      activities: 9000,
      food: 10000,
    },
    notes: [
      "Book Taj Mahal entry tickets online at least 3 days in advance.",
      "Carry cash for local markets in Jaipur — many vendors don't accept UPI.",
    ],
    itinerary: [
      {
        id: "day-1",
        day: 1,
        date: "2026-12-20",
        city: "Delhi",
        title: "Arrival and Old Delhi exploration",
        activities: [
          {
            id: "act-1",
            title: "Airport transfer to Karol Bagh hotel",
            time: "14:00",
            category: "Transport",
            cost: 800,
            notes: "Pre-book a cab from the airport to avoid surge pricing.",
          },
          {
            id: "act-2",
            title: "Chandni Chowk street food walk",
            time: "19:00",
            category: "Food",
            cost: 600,
            notes: "Try paranthe wali gali and jalebi at the corner stall.",
          },
        ],
      },
      {
        id: "day-2",
        day: 2,
        date: "2026-12-21",
        city: "Delhi",
        title: "Monuments and Humayun's Tomb",
        activities: [
          {
            id: "act-3",
            title: "Humayun's Tomb morning visit",
            time: "08:00",
            category: "Activities",
            cost: 350,
            notes: "Go early to beat the crowds and get good photos.",
          },
        ],
      },
    ],
    isShared: true,
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-01T09:00:00.000Z",
  },
  {
    id: "sample-kerala-backwaters",
    name: "Kerala Backwaters Retreat",
    description: "Houseboat stays in Alleppey, spice gardens in Munnar, and Kochi's colonial waterfront.",
    startDate: "2026-11-05",
    endDate: "2026-11-11",
    destinations: ["Kochi", "Alleppey", "Munnar"],
    estimatedBudget: 38000,
    budget: {
      transport: 6000,
      hotels: 16000,
      activities: 7000,
      food: 9000,
    },
    notes: ["Book the houseboat at least two weeks ahead for peak season.", "Carry light cotton clothes — humidity is high near the backwaters."],
    itinerary: [
      {
        id: "day-1",
        day: 1,
        date: "2026-11-05",
        city: "Kochi",
        title: "Arrive and explore Fort Kochi",
        activities: [
          {
            id: "act-4",
            title: "Check in at heritage homestay",
            time: "13:00",
            category: "Hotels",
            cost: 2800,
            notes: "Ask for a room facing the Chinese fishing nets.",
          },
          {
            id: "act-5",
            title: "Sunset walk along the Chinese fishing nets",
            time: "17:30",
            category: "Activities",
            cost: 0,
            notes: "Best light is between 5:30 and 6:30 pm.",
          },
        ],
      },
    ],
    isShared: false,
    createdAt: "2026-09-10T12:00:00.000Z",
    updatedAt: "2026-09-10T12:00:00.000Z",
  },
];

export const landingTestimonials = [
  {
    name: "Priya Sharma",
    role: "Travel blogger",
    quote: "TravelLoop turned our chaotic Rajasthan group trip into a plan everyone could actually follow.",
  },
  {
    name: "Arjun Mehta",
    role: "Weekend explorer",
    quote: "The budget view makes it obvious where the trip is getting expensive before it is too late.",
  },
  {
    name: "Sneha Iyer",
    role: "Solo traveller",
    quote: "Planned my entire Kerala backwaters trip in under 20 minutes. Felt like a complete product.",
  },
];
