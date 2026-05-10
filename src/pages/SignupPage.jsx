import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function SignupPage() {
  const { user, signup, isDemoMode } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Name must be at least 2 characters.";
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
      const result = await signup(form);
      showToast({
        type: "success",
        title: result.demoMode ? "Demo account ready" : "Account created",
        message: "Welcome to Traveloop Lite.",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      showToast({ type: "error", title: "Signup failed", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl justify-end">
        <ThemeToggle />
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900 lg:grid-cols-[0.88fr_1fr]">
        <div className="relative min-h-[320px]">
          <img
            src="https://images.unsplash.com/photo-1476900543704-4312b78632f8?auto=format&fit=crop&w=1200&q=85"
            alt="Train passing through mountains"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <Link to="/" className="text-sm font-semibold">Traveloop Lite</Link>
            <h1 className="mt-4 text-3xl font-semibold">Create a travel workspace that looks ready for a pitch.</h1>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Sign up</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {isDemoMode ? "No Firebase keys found, so this starts a local demo session." : "Create your Firebase-backed account."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label-text" htmlFor="name">Name</label>
              <input
                id="name"
                className="input-field mt-2"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Avery Stone"
              />
              {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
            </div>
            <div>
              <label className="label-text" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                className="input-field mt-2"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="you@example.com"
              />
              {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
            </div>
            <div>
              <label className="label-text" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                className="input-field mt-2"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="At least 6 characters"
              />
              {errors.password ? <p className="mt-1 text-sm text-red-500">{errors.password}</p> : null}
            </div>
            <button type="submit" className="primary-button w-full" disabled={submitting}>
              <UserPlus className="h-4 w-4" />
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-sky hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
