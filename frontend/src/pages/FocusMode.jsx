import React, { useState, useEffect } from 'react';
import { Play, Square, Coffee, Zap, BatteryCharging, Smile, Volume2 } from 'lucide-react';

export default function FocusMode() {
  // 1. Core Energy-Based State
  const [energyLevel, setEnergyLevel] = useState('Balanced'); // High, Balanced, Tired
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // 2. Intelligent Logic: Adjust Time based on Human-Centered Design
  const handleEnergyChange = (level) => {
    setEnergyLevel(level);
    setIsActive(false);
    setIsBreak(false);
    setSeconds(0);
    
    if (level === 'High') {
      setMinutes(45); // Deep Focus Session for High Energy
    } else if (level === 'Balanced') {
      setMinutes(25); // Standard Pomodoro
    } else if (level === 'Tired') {
      setMinutes(15); // Short Burst Session to avoid cognitive fatigue
    }
  };

  // 3. Precise Countdown Timer Core Engine
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            // Trigger Session Swapping Logic
            setIsBreak(!isBreak);
            if (!isBreak) {
              // Study ended, start intelligent break
              setMinutes(energyLevel === 'Tired' ? 10 : 5);
            } else {
              // Break ended, back to study
              handleEnergyChange(energyLevel);
            }
            setIsActive(false);
            alert(isBreak ? "Break over! Time to focus." : "Great session! Take a well-deserved break.");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, energyLevel]);

  return (
    <div className="flex-1 ml-64 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkText">Intelligent Focus Arena 🧠</h2>
        <p className="text-mutedGray text-sm">Adaptive countdown engineering to maximize cognitive retention and minimize fatigue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Card: The Main High-End Timer */}
        <div className="lg:col-span-2 bg-white border border-lavender/40 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Subtle Dynamic Status Badge */}
          <span className={`absolute top-6 right-6 px-4 py-1 rounded-full text-xs font-semibold ${
            isBreak ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-lavender-light text-lavender-dark border border-lavender/50'
          }`}>
            {isBreak ? '☕ Cognitive Recharging (Break)' : '🚀 Deep Work Active'}
          </span>

          {/* Big Timer Typography */}
          <div className="text-8xl font-black tracking-tight text-darkText select-none my-10">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          {/* Core Action Controllers */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-md transition-all duration-200 ${
                isActive ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-darkText text-white hover:bg-darkText/90'
              }`}
            >
              {isActive ? <Square size={16} /> : <Play size={16} />}
              {isActive ? 'Pause Session' : 'Start Focus'}
            </button>
            
            <button
              onClick={() => handleEnergyChange(energyLevel)}
              className="px-6 py-3.5 bg-background-warm text-darkText border border-lavender/60 hover:bg-lavender/10 rounded-xl font-medium text-sm transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right Column: Energy Config & Ambience Mixer */}
        <div className="space-y-6">
          
          {/* Section A: Human-Centered Energy Check */}
          <div className="bg-white/70 backdrop-blur-md border border-lavender/40 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-darkText mb-1">Current Cognitive Load</h3>
            <p className="text-xs text-mutedGray mb-4">How is your brain feeling right now?</p>
            
            <div className="space-y-2">
              {[
                { level: 'High', desc: 'Hyper-focused (45m sprint)', icon: <Zap size={14} className="text-amber-500" /> },
                { level: 'Balanced', desc: 'Standard workflow (25m session)', icon: <Smile size={14} className="text-lavender-dark" /> },
                { level: 'Tired', desc: 'Low battery (15m burst + long break)', icon: <BatteryCharging size={14} className="text-red-400" /> }
              ].map((item) => (
                <button
                  key={item.level}
                  onClick={() => handleEnergyChange(item.level)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                    energyLevel === item.level 
                      ? 'bg-white border-lavender-dark shadow-sm ring-1 ring-lavender' 
                      : 'bg-white/40 border-lavender/20 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <p className="text-xs font-semibold text-darkText">{item.level} Energy</p>
                      <p className="text-[11px] text-mutedGray">{item.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Sensory Isolation / Ambience (UI Only for now) */}
          <div className="bg-white/70 backdrop-blur-md border border-lavender/40 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-darkText mb-0.5">Sensory Isolation</h3>
                <p className="text-xs text-mutedGray">Block external audio frequencies.</p>
              </div>
              <Volume2 size={16} className="text-lavender-dark" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {['Binaural Beats', 'Rainforest', 'Lo-Fi Station', 'Cozy Cafe'].map((sound) => (
                <button 
                  key={sound}
                  className="p-2.5 text-center text-xs font-medium rounded-xl border border-lavender/30 bg-white shadow-2xs hover:bg-lavender/10 text-darkText transition-colors"
                >
                  {sound}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}