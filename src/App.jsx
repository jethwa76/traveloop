import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import BudgetOverviewPage from "./pages/BudgetOverviewPage.jsx";
import CreateTripPage from "./pages/CreateTripPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyTripsPage from "./pages/MyTripsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SharedItineraryPage from "./pages/SharedItineraryPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import TripDetailsPage from "./pages/TripDetailsPage.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/share/:tripId" element={<SharedItineraryPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/new" element={<CreateTripPage />} />
            <Route path="/trips/:tripId" element={<TripDetailsPage />} />
            <Route path="/trips/:tripId/edit" element={<CreateTripPage />} />
            <Route path="/budget" element={<BudgetOverviewPage />} />
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
