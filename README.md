# Traveloop Lite

Traveloop Lite is a modern travel planning MVP built with React, Vite, Tailwind CSS, Firebase Authentication, and Firestore. It is designed to look polished in a hackathon demo while staying realistic to build and ship in one day.

## Features

- Landing page with startup-style positioning, visuals, CTAs, features, testimonials, and footer
- Firebase-ready login and signup with form validation
- Protected dashboard routes
- Create, edit, delete, and view trips
- Destination stops, day-wise itinerary timeline, activities, and notes
- Budget categories for transport, hotels, activities, and food
- Recharts pie, bar, and trend charts
- Public read-only itinerary page with print-friendly layout
- Dark/light theme support
- Local demo mode when Firebase environment variables are not configured

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Recharts
- Lucide React Icons
- Firebase Auth
- Firebase Firestore

## Project Structure

```txt
src/
  assets/
  components/
  context/
  data/
  firebase/
  hooks/
  layouts/
  pages/
  routes/
  services/
  utils/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Firebase Setup

Create a Firebase project, then enable:

1. Authentication with Email/Password provider
2. Cloud Firestore

Copy `.env.example` to `.env` and fill in your Firebase web app config:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

When these values are present, the app uses Firebase Auth and Firestore. Without them, it falls back to local demo mode so the UI is immediately demoable.

## Suggested Firestore Rules

Use these as a starting point for an MVP. Tighten them before a real production launch.

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/trips/{tripId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /sharedTrips/{tripId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add the `VITE_FIREBASE_*` environment variables.
4. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### Firebase Hosting

Install Firebase CLI, then run:

```bash
npm run build
firebase login
firebase init hosting
firebase deploy
```

Set the public directory to `dist` and configure as a single-page app.

## Demo Flow

1. Open the landing page and click `Open demo` or `Start free`.
2. Log in with any valid email and a password of at least 6 characters if Firebase is not configured.
3. Review the dashboard seeded with sample trips.
4. Create a new trip.
5. Add activities, destinations, and notes from the trip details page.
6. Open the budget page to view Recharts analytics.
7. Publish a share link from a trip card or trip details page.

## Notes

This MVP intentionally keeps backend complexity low. Firestore stores trips under `users/{uid}/trips`, while published plans are copied to `sharedTrips/{tripId}` for public read-only access.
