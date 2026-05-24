import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Target, Timer, BarChart2, Settings, LogOut, ShieldAlert } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  // Navigation Links Setup
 // মেনু আইটেমগুলোর ভেতরে এই নতুন লাইনটি ঢুকিয়ে দিন (লাইন ১১ এর কাছাকাছি)
const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Focus Sprint', path: '/focus', icon: Timer },
  { name: 'Analytics Index', path: '/analytics', icon: BarChart2 },
  { name: 'Control Node', path: '/settings', icon: Settings },
  { name: 'Help & Security', path: '/help', icon: ShieldAlert }, // 👈 এই নতুন অপশনটি যোগ করুন
];

  // Secure Sign Out Action
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth'; // সেশন ট্র্যাশ করে অথ গেটওয়েতে পুশ করা
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-lavender/40 p-6 flex flex-col justify-between fixed left-0 top-0 shadow-[2px_0_12px_rgba(0,0,0,0.01)] z-50">
      
      {/* Brand Architecture Identity */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-darkText text-white rounded-xl shadow-md">
            <Target size={20} />
          </div>
          <div>
            <h1 className="font-bold text-darkText text-lg tracking-tight">FocusFlow</h1>
            <span className="text-[10px] font-semibold text-lavender-dark tracking-wider block -mt-1 uppercase">Ecosystem v1.0</span>
          </div>
        </div>

        {/* Reactive Navigation Tree */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-darkText text-white shadow-sm'
                    : 'text-mutedGray hover:bg-lavender/20 hover:text-darkText'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session Controller */}
      <div className="border-t border-lavender/40 pt-4">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Terminate Session</span>
        </button>
      </div>

    </div>
  );
}