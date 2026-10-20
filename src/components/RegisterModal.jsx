import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ScanFace, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Car, 
  Phone, 
  Mail, 
  User 
} from 'lucide-react';

export default function RegisterModal() {
  const { isRegisterModalOpen, setIsRegisterModalOpen, registerMember, activeBranchId, branches } = useFitness();

  const [formData, setFormData] = useState({
    name: '',
    tier: 'VIP',
    branch: activeBranchId,
    phone: '+263 77 ',
    email: '',
    plate: 'AFX-',
    balance: '100'
  });

  const [isCapturing, setIsCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState(0);

  if (!isRegisterModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsCapturing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setCaptureProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          registerMember(formData);
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#d99b26', '#f5af30', '#ffffff', '#10b981']
            });
          } catch {
            // Confetti optional
          }
          setIsCapturing(false);
          setCaptureProgress(0);
          setIsRegisterModalOpen(false);
        }, 300);
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-cardbg border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 flex flex-col gap-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
              <ScanFace className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">New Biometric Enrollment</h3>
              <p className="text-[11px] text-slate-400">Generate neural face template & sync across all 3 gym nodes</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capture Simulation HUD */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-accentgold/60 flex items-center justify-center bg-slate-950/60 shadow-inner">
            <ScanFace className={`w-12 h-12 text-accentgold ${isCapturing ? 'animate-pulse scale-110' : ''} transition-all`} />
            {isCapturing && (
              <div className="absolute inset-0 rounded-full border-2 border-accentgold animate-ping opacity-60"></div>
            )}
          </div>

          <div className="text-center">
            <div className="text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Omni-Access Facial Embedder v4.2</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isCapturing ? `Synthesizing 128-point biometric hash... ${captureProgress}%` : 'Face camera calibrated & ready for 128-point facial landmark registration'}
            </p>
          </div>

          {isCapturing && (
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-accentgold h-full transition-all duration-150"
                style={{ width: `${captureProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Member Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Nyasha Chisamba"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Membership Tier
              </label>
              <select
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium cursor-pointer"
              >
                <option value="VIP">VIP Omni Pass (All Zones + Valet)</option>
                <option value="CORPORATE">Corporate Executive</option>
                <option value="STANDARD">Standard Floor Pass</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Home Branch
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium cursor-pointer"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Vehicle Plate (Valet)
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="plate"
                  value={formData.plate}
                  onChange={handleChange}
                  placeholder="e.g. AGH-9921"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@totalfitness.co.zw"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Initial Canteen Wallet ($)
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  min="0"
                  step="5"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              disabled={isCapturing}
              onClick={() => setIsRegisterModalOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCapturing || !formData.name.trim()}
              className="px-5 py-2 bg-accentgold hover:bg-accentgoldhover text-black text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isCapturing ? (
                <span>Encoding Neural Template...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Biometric Enrollment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
