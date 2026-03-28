import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success(`Welcome, ${form.name}! 🏏 Build your dream team!`);
      navigate('/');
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'This email is already registered.'
          : err.code === 'auth/invalid-email'
          ? 'Invalid email address.'
          : 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <img className="h-16 mx-auto mb-3" src={logo} alt="BPL Dream 11" />
          <h1 className="text-2xl font-bold text-[#131313]">Create Account</h1>
          <p className="text-[#131313]/60 text-sm mt-1">Join and build your BPL Dream 11 team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none focus:border-[#E7FE29] focus:ring-1 focus:ring-[#E7FE29] text-[#131313]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none focus:border-[#E7FE29] focus:ring-1 focus:ring-[#E7FE29] text-[#131313]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 6 characters"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none focus:border-[#E7FE29] focus:ring-1 focus:ring-[#E7FE29] text-[#131313]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Repeat password"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none focus:border-[#E7FE29] focus:ring-1 focus:ring-[#E7FE29] text-[#131313]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#131313] text-white font-bold py-3 rounded-xl hover:bg-[#131313]/80 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-[#131313]/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#131313] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
