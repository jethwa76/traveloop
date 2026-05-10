import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, hasFirebaseConfig } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'demo@traveloop.app', password: 'password123' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email.includes('@') || form.password.length < 6) return setError('Use a valid email and a 6+ character password.');
    try { await login(form.email, form.password); navigate('/dashboard'); } catch (err) { setError(err.message); }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-hero-mesh px-4 py-10">
      <form onSubmit={submit} className="glass-card w-full max-w-md rounded-[2rem] p-8">
        <Link to="/" className="mb-8 flex items-center gap-2 text-2xl font-black"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-rose-400 text-white"><Plane /></span> Traveloop</Link>
        <h1 className="text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">{hasFirebaseConfig ? 'Sign in with Firebase Authentication.' : 'Demo mode is active until Firebase env vars are added.'}</p>
        <div className="mt-6 space-y-4">
          <label className="block"><span className="label">Email</span><input className="input mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="block"><span className="label">Password</span><input className="input mt-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        </div>
        {error && <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-950">{error}</p>}
        <button className="btn-primary mt-6 w-full">Login</button>
        <p className="mt-5 text-center text-sm text-slate-500">No account? <Link className="font-bold text-cyan-600" to="/signup">Create one</Link></p>
      </form>
    </div>
  );
}
