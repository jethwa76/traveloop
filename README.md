# Traveloop Lite

Traveloop Lite is a polished, hackathon-ready travel planning MVP built with React, Vite, Tailwind CSS, Firebase, Framer Motion, Recharts, and Lucide icons. It helps users create trips, plan day-wise itineraries, estimate budgets, visualize spend, and share public read-only travel plans.

## Features

- Modern SaaS landing page with hero, feature cards, testimonials, and footer
- Firebase Authentication-ready login and signup flows with validation
- Protected app routes for dashboard, trip creation, trip management, trip details, and budgets
- Firestore CRUD service layer for trip creation, reading, updates, and deletion
- Demo mode when Firebase environment variables are not configured
- Responsive dashboard with analytics cards, recent trips, quick actions, and upcoming trips
- Trip cards with dates, destinations, budget preview, edit/share/delete actions
- Day-wise timeline UI with add-activity modal and notes
- Budget overview with category cards, pie chart, bar chart, total cost, and daily averages
- Public shareable itinerary page with print-friendly read-only layout
- Dark/light theme support with persisted preference
- Framer Motion transitions, hover effects, modal animations, and sidebar entrance animation

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Recharts
- Lucide React Icons
- Firebase Authentication
- Firebase Firestore

## Project Structure

```txt
src/
 ├── assets/
 ├── components/
 ├── context/
 ├── data/
 ├── firebase/
 ├── hooks/
 ├── layouts/
 ├── pages/
 ├── routes/
 ├── services/
 ├── utils/
 ├── App.jsx
 ├── main.jsx
 └── styles.css
```

## Installation

```bash
npm install
npm run dev
```

Open the local Vite URL shown in your terminal.

## Firebase Setup

1. Create a Firebase project in the Firebase Console.
2. Enable **Authentication** and add the Email/Password provider.
3. Create a **Cloud Firestore** database.
4. Copy `.env.example` to `.env`.
5. Fill in the Vite environment variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

When these variables are missing, Traveloop Lite runs in demo mode with seeded trips so the UI remains demo-ready.

## Firestore Data Model

Trips are stored in a `trips` collection:

```js
{
  userId: 'firebase-user-id',
  name: 'Kyoto Slow Travel',
  startDate: '2026-09-05',
  endDate: '2026-09-15',
  destinations: ['Kyoto', 'Nara', 'Osaka'],
  budget: 5200,
  description: 'Temples, tea houses, gardens...',
  status: 'Planning',
  public: true,
  cover: 'https://...',
  expenses: {
    transport: 1180,
    hotels: 2200,
    activities: 890,
    food: 930
  },
  itinerary: [
    {
      day: 1,
      title: 'Gion welcome walk',
      city: 'Kyoto',
      activities: ['Machiya check-in'],
      notes: 'Reserve dinner near Pontocho.'
    }
  ],
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
}
```

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the Firebase environment variables in Vercel Project Settings.
4. Use the default build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Choose `dist` as the public directory and configure rewrites to `index.html` for React Router.

## Useful Commands

```bash
npm run dev       # start local development server
npm run build     # build production assets
npm run preview   # preview the production build
```
