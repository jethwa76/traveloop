export const sampleTrips = [
  {
    id: "sample-japan-spring",
    name: "Japan Spring Loop",
    description: "Tokyo energy, Kyoto temples, and a slow Osaka food weekend.",
    startDate: "2026-04-08",
    endDate: "2026-04-16",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    estimatedBudget: 3200,
    budget: {
      transport: 760,
      hotels: 1180,
      activities: 520,
      food: 740,
    },
    notes: [
      "Book Shinkansen seats two weeks before departure.",
      "Keep one unscheduled morning in Kyoto for weather flexibility.",
    ],
    itinerary: [
      {
        id: "day-1",
        day: 1,
        date: "2026-04-08",
        city: "Tokyo",
        title: "Arrival and Shibuya first night",
        activities: [
          {
            id: "act-1",
            title: "Airport transfer to Shinjuku hotel",
            time: "15:30",
            category: "Transport",
            cost: 42,
            notes: "Use Narita Express if luggage is heavy.",
          },
          {
            id: "act-2",
            title: "Shibuya crossing and ramen crawl",
            time: "19:00",
            category: "Food",
            cost: 38,
            notes: "Keep it light after the flight.",
          },
        ],
      },
      {
        id: "day-2",
        day: 2,
        date: "2026-04-09",
        city: "Tokyo",
        title: "Asakusa, Ueno, and design stores",
        activities: [
          {
            id: "act-3",
            title: "Senso-ji morning walk",
            time: "09:00",
            category: "Activities",
            cost: 0,
            notes: "Go early for fewer crowds.",
          },
        ],
      },
    ],
    isShared: true,
    createdAt: "2026-01-14T09:00:00.000Z",
    updatedAt: "2026-01-14T09:00:00.000Z",
  },
  {
    id: "sample-lisbon-workation",
    name: "Lisbon Workation",
    description: "A sunny remote-work week with Sintra and a coastal day trip.",
    startDate: "2026-06-03",
    endDate: "2026-06-10",
    destinations: ["Lisbon", "Sintra", "Cascais"],
    estimatedBudget: 1850,
    budget: {
      transport: 260,
      hotels: 780,
      activities: 330,
      food: 480,
    },
    notes: ["Reserve a coworking pass near Baixa.", "Use Bolt or metro after late dinners."],
    itinerary: [
      {
        id: "day-1",
        day: 1,
        date: "2026-06-03",
        city: "Lisbon",
        title: "Settle in and Alfama sunset",
        activities: [
          {
            id: "act-4",
            title: "Check in at boutique stay",
            time: "14:00",
            category: "Hotels",
            cost: 112,
            notes: "Ask for a quiet room for calls.",
          },
          {
            id: "act-5",
            title: "Miradouro sunset walk",
            time: "18:30",
            category: "Activities",
            cost: 0,
            notes: "Bring a light jacket.",
          },
        ],
      },
    ],
    isShared: false,
    createdAt: "2026-02-02T12:00:00.000Z",
    updatedAt: "2026-02-02T12:00:00.000Z",
  },
];

export const landingTestimonials = [
  {
    name: "Mira Chen",
    role: "Product designer",
    quote: "Traveloop helped us turn a messy group chat into a plan everyone could actually follow.",
  },
  {
    name: "Arjun Mehta",
    role: "Weekend explorer",
    quote: "The budget view makes it obvious where the trip is getting expensive before it is too late.",
  },
  {
    name: "Sofia Rivera",
    role: "Hackathon judge",
    quote: "It feels like a complete product, not a stitched-together demo.",
  },
];
