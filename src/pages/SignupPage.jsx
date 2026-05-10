import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name || !form.email.includes('@') || form.password.length < 6) return setError('Add a name, valid email, and 6+ character password.');
    try { await signup(form.name, form.email, form.password); navigate('/dashboard'); } catch (err) { setError(err.message); }
  };
  return (
    <div className="grid min-h-screen place-items-center bg-hero-mesh px-4 py-10">
      <form onSubmit={submit} className="glass-card w-full max-w-md rounded-[2rem] p-8">
        <Link to="/" className="mb-8 flex items-center gap-2 text-2xl font-black"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-rose-400 text-white"><Plane /></span> Traveloop</Link>
        <h1 className="text-3xl font-black">Create your planner</h1>
        <p className="mt-2 text-sm text-slate-500">Start with demo data, then connect Firebase for persistent production auth.</p>
        <div className="mt-6 space-y-4">
          <label className="block"><span className="label">Name</span><input className="input mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="block"><span className="label">Email</span><input className="input mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="block"><span className="label">Password</span><input className="input mt-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        </div>
        {error && <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-950">{error}</p>}
        <button className="btn-primary mt-6 w-full">Create account</button>
        <p className="mt-5 text-center text-sm text-slate-500">Already have one? <Link className="font-bold text-cyan-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
