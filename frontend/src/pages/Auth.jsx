import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Target, Sparkles } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all fields securely.');
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? 'signin' : 'signup';
    
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication collapsed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-background-warm overflow-hidden">
      
      {/* LEFT SIDE: Luxury Branding Banner (Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-darkText p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />
        
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2.5 bg-white text-darkText rounded-xl shadow-md">
            <Target size={22} />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl tracking-tight">FocusFlow</h1>
            <span className="text-[10px] font-semibold text-lavender block uppercase tracking-wider">Ecosystem Node</span>
          </div>
        </div>

        {/* Motivational Text */}
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-lavender text-xs font-medium mb-4">
            <Sparkles size={12} /> Higher Education Optimization Active
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Calibrate your focus. Command your goals.
          </h2>
          <p className="text-mutedGray text-sm leading-relaxed">
            Designed for deep architectural sprints, managing assembly computations, and compiler execution logic seamlessly.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-xs text-mutedGray/60 relative z-10">
          © 2026 FocusFlow Inc. Secure Layer Protected.
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Full-Screen Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex p-3 bg-lavender-light rounded-2xl text-lavender-dark mb-4 lg:hidden">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-bold text-darkText tracking-tight">
              {isLogin ? 'Initiate Core Session' : 'Provision Ecosystem'}
            </h2>
            <p className="text-mutedGray text-sm mt-2">
              {isLogin ? 'Welcome back! Input credentials to unlock dashboards.' : 'Register to deploy your personal metrics vault.'}
            </p>
          </div>

          {/* Error Handler */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-medium animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkText pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-mutedGray" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Lamia"
                    className="w-full pl-12 pr-4 py-3 text-sm bg-background-warm border border-lavender/60 rounded-xl focus:outline-none focus:border-lavender-dark font-medium transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-darkText pl-1">Academic Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-mutedGray" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="username@domain.com"
                  className="w-full pl-12 pr-4 py-3 text-sm bg-background-warm border border-lavender/60 rounded-xl focus:outline-none focus:border-lavender-dark font-medium transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-darkText pl-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-mutedGray" size={16} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 text-sm bg-background-warm border border-lavender/60 rounded-xl focus:outline-none focus:border-lavender-dark font-medium transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-darkText text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-darkText/90 shadow-md transition-colors mt-4 disabled:opacity-50"
            >
              {loading ? 'Validating Vault...' : isLogin ? 'Access Node' : 'Deploy Node'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Switcher */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs font-medium text-lavender-dark hover:underline"
            >
              {isLogin ? "Don't have an account? Create an ecosystem node" : 'Already verified? Execute access gate'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}