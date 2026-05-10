import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateTripPage from './pages/CreateTripPage';
import MyTripsPage from './pages/MyTripsPage';
import TripDetailsPage from './pages/TripDetailsPage';
import BudgetOverviewPage from './pages/BudgetOverviewPage';
import SharedItineraryPage from './pages/SharedItineraryPage';

function Page({ children }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>{children}</motion.div>;
}

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><LandingPage /></Page>} />
        <Route path="/login" element={<Page><LoginPage /></Page>} />
        <Route path="/signup" element={<Page><SignupPage /></Page>} />
        <Route path="/share/:tripId" element={<Page><SharedItineraryPage /></Page>} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Page><DashboardPage /></Page>} />
            <Route path="/trips" element={<Page><MyTripsPage /></Page>} />
            <Route path="/trips/new" element={<Page><CreateTripPage /></Page>} />
            <Route path="/trips/:tripId" element={<Page><TripDetailsPage /></Page>} />
            <Route path="/budget" element={<Page><BudgetOverviewPage /></Page>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
