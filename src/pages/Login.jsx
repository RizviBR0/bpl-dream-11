import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🏏');
      navigate('/');
    } catch (err) {
      const msg =
        err.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : err.code === 'auth/user-not-found'
            ? 'No account found with that email.'
            : 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-linear-to-b from-[#e4f9ff] to-[#FEFEFE] border border-gray-500/10 rounded-2xl shadow-lg shadow-[#8feeff3f] w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <img className="h-16 mx-auto mb-3" src={logo} alt="BPL Dream 11" />
          <h1 className="text-2xl font-bold text-[#131313]">Sign In</h1>
          <p className="text-[#131313]/60 text-sm mt-1">Build your BPL Dream 11 team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none text-[#131313]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#131313] mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full border border-[#131313]/15 rounded-xl px-4 py-3 outline-none text-[#131313]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#131313] text-white font-bold py-3 rounded-xl hover:bg-[#131313]/80 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-[#131313]/60">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[#131313] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
