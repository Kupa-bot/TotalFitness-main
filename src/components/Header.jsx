import React, { useState, useEffect } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Shield, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Scan, 
  Users, 
  KeyRound, 
  UtensilsCrossed, 
  Car, 
  BarChart3, 
  Network, 
  Radio,
  Sun,
  Moon
} from 'lucide-react';

export default function Header() {
  const { 
    branches, 
    activeBranchId, 
    setActiveBranchId, 
    emergencyOverride, 
    triggerEmergencyOverride, 
    deactivateEmergencyOverride, 
    soundMuted, 
    toggleSound,
    activeTab,
    setActiveTab,
    isSyncingMesh,
    theme,
    toggleTheme
  } = useFitness();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' CAT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'terminal', label: 'Live Gate Terminal', icon: Scan },
    { id: 'members', label: 'Members & Enrollment', icon: Users },
    { id: 'matrix', label: 'Access Policy Matrix', icon: KeyRound },
    { id: 'canteen', label: 'Smart Canteen POS', icon: UtensilsCrossed },
    { id: 'valet', label: 'Valet & Carwash Bay', icon: Car },
    { id: 'analytics', label: 'Audit Logs & Analytics', icon: BarChart3 },
    { id: 'mesh', label: 'Multi-Branch Mesh', icon: Network },
  ];

  return (
    <header className="bg-cardbg border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3 shadow-2xl">
      {/* Top Main Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Circular Total Fitness Luxury Logo */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-900 via-zinc-800 to-zinc-700 p-0.5 border-2 border-accentgold/70 shadow-xl relative flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 rounded-full border border-accentgold/30"></div>
              <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-accentgold to-[#b87c14] rounded-t-full opacity-90"></div>
              <span className="keep-white relative z-10 font-black text-white italic text-base tracking-tighter drop-shadow">TF</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold tracking-wider text-white text-base">TOTAL FITNESS</h1>
                <span className="text-[11px] bg-amber-500/10 text-accentgold border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold tracking-wide">
                  OMNI-ACCESS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Neural Engine: <strong className="text-slate-200 font-medium">99.8% Accuracy</strong> | 15 Biometric Feeds</span>
              </p>
            </div>
          </div>

          {/* Mobile Clock & Override Status */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-accentgold">{timeStr}</span>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Branch Switcher */}
          <div className="relative min-w-[210px] flex-1 md:flex-initial">
            <select
              value={activeBranchId}
              onChange={(e) => setActiveBranchId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-accentgold focus:outline-none appearance-none cursor-pointer pr-8 font-medium shadow-inner"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Global Mesh Sync Indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Radio className={`w-3.5 h-3.5 ${isSyncingMesh ? 'text-accentgold animate-spin' : 'text-emerald-400 animate-pulse'}`} />
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Global Mesh</div>
              <div className="text-[11px] text-accentgold font-bold flex items-center gap-1 leading-tight mt-0.5">
                <span>Synchronized</span>
                <span className="text-[10px] text-slate-400 font-normal">(&lt;10ms)</span>
              </div>
            </div>
          </div>

          {/* Live Atomic Clock */}
          <div className="hidden md:block bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
            <div className="text-xs font-mono font-bold text-accentgold">{timeStr}</div>
            <div className="text-[9px] text-slate-400 leading-none mt-0.5">Multi-Site Atomic Link</div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-xl border text-xs transition-all ${
              soundMuted 
                ? 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white' 
                : 'bg-amber-500/10 text-accentgold border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Luxury Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Luxury Light Mode' : 'Switch to Stealth Dark Mode'}
            className={`p-2 rounded-xl border text-xs transition-all flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-slate-900/90 text-amber-400 border-slate-700/80 hover:bg-slate-800 hover:border-amber-500/40'
                : 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-accentgold hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Master Emergency Override Button */}
          {emergencyOverride ? (
            <button
              onClick={deactivateEmergencyOverride}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-600/40 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>DISENGAGE OVERRIDE</span>
            </button>
          ) : (
            <button
              onClick={triggerEmergencyOverride}
              className="bg-slate-900 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
              title="Emergency gate unlock across all facilities"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Emergency</span> Unlock
            </button>
          )}
        </div>
      </div>

      {/* Emergency Active Warning Banner */}
      {emergencyOverride && (
        <div className="mt-3 bg-red-950/90 border-2 border-red-500 rounded-xl p-2.5 flex items-center justify-between text-white animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.4)]">
          <div className="flex items-center gap-2 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="keep-white">⚠️ MASTER SAFETY OVERRIDE ACTIVE: All turnstiles, thermal doors, and gates in Borrowdale, Avondale, and CBD are UNLOCKED.</span>
          </div>
          <button
            onClick={deactivateEmergencyOverride}
            className="keep-white text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-bold shrink-0 shadow"
          >
            Restore Locks
          </button>
        </div>
      )}

      {/* Navigation Sub-Bar */}
      <nav className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-accentgold text-black shadow-lg shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
