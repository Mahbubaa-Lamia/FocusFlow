import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // ✅ শুধু এই লাইনটি থাকবে
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { BarChart3, Settings as SettingsIcon, HelpCircle, Shield, LifeBuoy, Play, Pause, RotateCcw, Zap, Smile, BatteryCharging, Volume2 } from 'lucide-react';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" replace />;
};

function App() {
  const token = localStorage.getItem('token');
  
  // App-wide Matrix States
  const [darkMode, setDarkMode] = useState(false);
  const [dbTasks, setDbTasks] = useState([]);

  // Fetch data to sync analytics globally
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/tasks')
        .then(res => setDbTasks(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  const totalTasks = dbTasks.length;
  const completedTasks = dbTasks.filter(t => t.status === 'Completed').length;
  const highPriorityTasks = dbTasks.filter(t => t.priority === 'High' && t.status === 'Completed').length;

  // ⏱️ 1. Real-Time Intelligent Focus Arena Component
  const FocusSprint = () => {
    const [time, setTime] = useState(1500); // Default 25 min
    const [isActive, setIsActive] = useState(false);
    const [energyMode, setEnergyMode] = useState('Balanced');

    useEffect(() => {
      let interval = null;
      if (isActive && time > 0) {
        interval = setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else if (time === 0) {
        setIsActive(false);
        alert('🎯 Calibrated Deep Sprint Completed! Take a cognitive break.');
      }
      return () => clearInterval(interval);
    }, [isActive, time]);

    const handleModeChange = (mode, minutes) => {
      setEnergyMode(mode);
      setTime(minutes * 60);
      setIsActive(false);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className={`min-h-screen flex-1 ml-64 p-8 transition-colors duration-300 ${darkMode ? 'bg-[#0f111a] text-white' : 'bg-background-warm text-darkText'}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Intelligent Focus Arena 🧠</h2>
          <p className="text-mutedGray text-sm">Adaptive countdown engineering to maximize cognitive retention and minimize fatigue.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timer Display Box */}
          <div className={`lg:col-span-2 rounded-3xl p-12 flex flex-col items-center justify-center border shadow-sm relative ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/40'}`}>
            <span className="absolute top-6 right-6 px-3 py-1 bg-lavender/20 text-lavender-dark text-xs font-semibold rounded-full flex items-center gap-1">
              🚀 Deep Work Active
            </span>

            <div className="text-8xl font-mono font-black tracking-tighter mb-8 selection:bg-transparent">
              {formatTime(time)}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsActive(!isActive)}
                className="bg-darkText text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                {isActive ? <Pause size={16} /> : <Play size={16} />}
                {isActive ? 'Pause Sprint' : 'Start Focus'}
              </button>
              <button 
                onClick={() => { setIsActive(false); setTime(energyMode === 'High' ? 2700 : energyMode === 'Tired' ? 900 : 1500); }}
                className={`px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-lavender hover:bg-lavender/10'}`}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Right Panels: Cognitive Load & Sensory Isolation */}
          <div className="space-y-6">
            {/* Cognitive Load Tracker */}
            <div className={`rounded-3xl p-6 border shadow-sm ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/40'}`}>
              <h4 className="text-xs font-bold text-mutedGray uppercase tracking-wider mb-3">Current Cognitive Load</h4>
              <p className="text-[11px] text-mutedGray mb-4">How is your brain feeling right now?</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => handleModeChange('High', 45)}
                  className={`w-full p-3.5 text-left rounded-xl border text-xs flex items-center justify-between transition-all ${energyMode === 'High' ? 'border-lavender-dark bg-lavender/10 font-bold' : 'border-lavender/40 bg-transparent'}`}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-500" />
                    <div>
                      <p className="font-semibold">High Energy</p>
                      <p className="text-[10px] text-mutedGray">Hyper-focused (45m sprint)</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => handleModeChange('Balanced', 25)}
                  className={`w-full p-3.5 text-left rounded-xl border text-xs flex items-center justify-between transition-all ${energyMode === 'Balanced' ? 'border-lavender-dark bg-lavender/10 font-bold' : 'border-lavender/40 bg-transparent'}`}
                >
                  <div className="flex items-center gap-2">
                    <Smile size={14} className="text-lavender-dark" />
                    <div>
                      <p className="font-semibold">Balanced Energy</p>
                      <p className="text-[10px] text-mutedGray">Standard workflow (25m session)</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => handleModeChange('Tired', 15)}
                  className={`w-full p-3.5 text-left rounded-xl border text-xs flex items-center justify-between transition-all ${energyMode === 'Tired' ? 'border-lavender-dark bg-lavender/10 font-bold' : 'border-lavender/40 bg-transparent'}`}
                >
                  <div className="flex items-center gap-2">
                    <BatteryCharging size={14} className="text-red-500" />
                    <div>
                      <p className="font-semibold">Tired Energy</p>
                      <p className="text-[10px] text-mutedGray">Low battery (15m burst + break)</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Sensory Isolation Soundscape */}
            <div className={`rounded-3xl p-6 border shadow-sm ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/40'}`}>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-mutedGray uppercase tracking-wider">Sensory Isolation</h4>
                <Volume2 size={14} className="text-mutedGray" />
              </div>
              <p className="text-[11px] text-mutedGray mb-3">Block external audio frequencies.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Binaural Beats', 'Rainforest', 'Lo-Fi Station', 'Cozy Cafe'].map(sound => (
                  <button key={sound} onClick={() => alert(`🔊 Tuning into: ${sound}`)} className={`py-2 px-3 text-[11px] font-medium rounded-xl border text-center ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-lavender/50 hover:bg-lavender/10'}`}>
                    {sound}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 📊 2. Live Adaptive Analytics Index
  const Analytics = () => (
    <div className={`min-h-screen flex-1 ml-64 p-8 transition-colors duration-300 ${darkMode ? 'bg-[#0f111a] text-white' : 'bg-background-warm text-darkText'}`}>
      <h2 className="text-2xl font-bold mb-1">📊 Analytics Index</h2>
      <p className="text-mutedGray text-sm mb-6">Real-time cryptographic compilation of your study footprint.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/30'}`}>
          <p className="text-xs text-mutedGray font-medium">Task Compilation Rate</p>
          <h3 className="text-3xl font-bold mt-2">{totalTasks} <span className="text-xs font-normal text-mutedGray">Registered</span></h3>
        </div>
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/30'}`}>
          <p className="text-xs text-mutedGray font-medium">Success Core Node</p>
          <h3 className="text-3xl font-bold mt-2 text-green-500">{completedTasks} <span className="text-xs font-normal text-mutedGray">Resolved</span></h3>
        </div>
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/30'}`}>
          <p className="text-xs text-mutedGray font-medium">High-Load Milestones</p>
          <h3 className="text-3xl font-bold mt-2 text-lavender-dark">{highPriorityTasks} <span className="text-xs font-normal text-mutedGray">High Priority Done</span></h3>
        </div>
      </div>

      <div className={`border rounded-3xl p-8 flex flex-col items-center justify-center min-h-[250px] ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/40'}`}>
        <BarChart3 size={40} className="text-lavender-dark mb-3 animate-pulse" />
        <p className="font-semibold text-sm">Ecosystem Matrix Synced Perfectly</p>
        <p className="text-xs text-mutedGray mt-1">Your completion efficiency rate is currently {totalTasks > 0 ? Math.round((completedTasks/totalTasks)*100) : 0}% for today's active sprint.</p>
      </div>
    </div>
  );

  // ⚙️ 3. Fully Operational Control Node (Settings with True Dark Mode Toggle)
  const Settings = () => (
    <div className={`min-h-screen flex-1 ml-64 p-8 transition-colors duration-300 ${darkMode ? 'bg-[#0f111a] text-white' : 'bg-background-warm text-darkText'}`}>
      <h2 className="text-2xl font-bold mb-1">⚙️ Control Node (System Settings)</h2>
      <p className="text-mutedGray text-sm mb-6">Configure system architecture preferences and theme illumination matrix.</p>
      
      <div className={`border rounded-3xl p-6 max-w-2xl space-y-4 ${darkMode ? 'bg-[#151824] border-gray-800' : 'bg-white border-lavender/40'}`}>
        <div className="flex justify-between items-center p-4 rounded-2xl border border-lavender/10 bg-background-warm/50">
          <div>
            <h4 className="text-sm font-bold">Dark Theme Matrix</h4>
            <p className="text-[11px] text-mutedGray">Toggle system illumination parameters instantly</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${darkMode ? 'bg-lavender-dark text-white' : 'bg-darkText text-white hover:bg-darkText/90'}`}
          >
            {darkMode ? 'Switch to Light Mode ☀️' : 'Activate Dark Mode 🌙'}
          </button>
        </div>

        <div className="flex justify-between items-center p-4 rounded-2xl border border-lavender/10 bg-background-warm/50">
          <div>
            <h4 className="text-sm font-bold">Flush Local Session Cache</h4>
            <p className="text-[11px] text-mutedGray">Purge storage traces and reset active session tokens</p>
          </div>
          <button onClick={() => { localStorage.clear(); window.location.href='/auth'; }} className="text-xs font-semibold px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
            Flush Session
          </button>
        </div>
      </div>
    </div>
  );

  // 🛡️ 4. Premium Help & Security Documentation Node
  const HelpSecurity = () => (
    <div className={`min-h-screen flex-1 ml-64 p-8 transition-colors duration-300 ${darkMode ? 'bg-[#0f111a] text-white' : 'bg-background-warm text-darkText'}`}>
      <h2 className="text-2xl font-bold mb-1">🛡️ Help & Security Core</h2>
      <p className="text-mutedGray text-sm mb-6">Access structural engine blueprints and security logs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border rounded-3xl p-6 shadow-sm ${darkMode ? 'bg-[#151824] border-gray-800 text-white' : 'bg-white border-lavender/40'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-lavender-light rounded-xl text-lavender-dark"><LifeBuoy size={18} /></div>
            <h3 className="font-bold text-sm">System FAQ & Support Gate</h3>
          </div>
          <p className="text-xs text-mutedGray leading-relaxed">Need assistance compiling your deep sprints or checking assembly language tracking matrix? Reach out directly to your secure node controller configuration parameters at support@focusflow.io.</p>
        </div>
        <div className={`border rounded-3xl p-6 shadow-sm ${darkMode ? 'bg-[#151824] border-gray-800 text-white' : 'bg-white border-lavender/40'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-xl text-green-600"><Shield size={18} /></div>
            <h3 className="font-bold text-sm">Cryptographic Vault Framework</h3>
          </div>
          <p className="text-xs text-mutedGray leading-relaxed">Your network connection node is encrypted using JSON Web Tokens (JWT). All system access protocols and user identity variables are protected by state-of-the-art bcrypt salt hashing algorithms.</p>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className={`flex min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-[#0f111a]' : 'bg-background-warm'}`}>
        {token && <Sidebar />}
        
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard darkMode={darkMode} /></ProtectedRoute>} />
          <Route path="/focus" element={<ProtectedRoute><FocusSprint /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpSecurity /></ProtectedRoute>} />
          <Route path="/auth" element={!token ? <Auth /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;