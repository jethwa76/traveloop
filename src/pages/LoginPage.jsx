import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Plane } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function LoginPage() {
  const { user, login, isDemoMode } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "demo@traveloop.app", password: "traveloop" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const nextErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const result = await login(form.email, form.password);
      showToast({
        type: "success",
        title: result.demoMode ? "Demo session started" : "Welcome back",
        message: result.demoMode ? "Add Firebase keys to enable real accounts." : "Your trips are loading.",
      });
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (error) {
      showToast({ type: "error", title: "Login failed", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white lg:grid-cols-[1fr_0.9fr]">
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Plane className="h-5 w-5" />
              </span>
              <span className="font-semibold">Traveloop Lite</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-semibold">Log in</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {isDemoMode ? "Use any valid email and a 6+ character password to enter demo mode." : "Continue to your travel workspace."}
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label-text" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input-field mt-2"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
              {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
            </div>
            <div>
              <label className="label-text" htmlFor="password">Password</label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-11"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <p className="mt-1 text-sm text-red-500">{errors.password}</p> : null}
            </div>

            <button type="submit" className="primary-button w-full" disabled={submitting}>
              <LogIn className="h-4 w-4" />
              {submitting ? "Signing in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-brand-sky hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </section>

      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=85"
          alt="Traveler with a map"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute bottom-10 left-10 right-10 rounded-lg border border-white/20 bg-white/15 p-6 text-white backdrop-blur">
          <p className="text-sm uppercase opacity-80">Plan with context</p>
          <p className="mt-3 text-3xl font-semibold">Trips, budgets, and timelines stay in one calm workspace.</p>
        </div>
      </aside>
    </div>
  );
}
