import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  KeyRound, 
  RotateCcw, 
  Check, 
  X, 
  ShieldCheck, 
  Crown, 
  Building2, 
  Dumbbell, 
  Waves, 
  Utensils, 
  Car, 
  Sparkles,
  Info
} from 'lucide-react';

export default function PolicyMatrixTab() {
  const { 
    permissions, 
    updatePermission, 
    resetPermissionsToDefault, 
    zones, 
    members 
  } = useFitness();

  const [testMemberId, setTestMemberId] = useState(members[0]?.id || 'TF-8824');
  const selectedMember = members.find((m) => m.id === testMemberId) || members[0];

  const zoneIcons = {
    turnstile: Dumbbell,
    vip: Crown,
    baths: Waves,
    canteen: Utensils,
    carwash: Car
  };

  const tiers = [
    { key: 'VIP', label: 'VIP Omni Pass', icon: Crown, badgeColor: 'bg-amber-500/20 text-accentgold border-amber-500/40' },
    { key: 'CORPORATE', label: 'Corporate Executive', icon: Building2, badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
    { key: 'STANDARD', label: 'Standard Floor Pass', icon: Dumbbell, badgeColor: 'bg-slate-800 text-slate-300 border-slate-700' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Facility Access Policy Matrix</h2>
              <span className="text-[10px] bg-amber-500/10 text-accentgold border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                Autonomous Zone Gating
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Granular biometric authorization rules synchronized across Borrowdale, Avondale, and CBD nodes
            </p>
          </div>
        </div>

        <button
          onClick={resetPermissionsToDefault}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow"
        >
          <RotateCcw className="w-3.5 h-3.5 text-accentgold" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Main Grid: Matrix Table (7 Cols) & Real-Time Clearance Simulator (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Policy Matrix Table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accentgold" />
                <span>Zone Authorization Grid</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                Click any status badge to toggle permission
              </span>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pl-2 font-bold">Facility Zone & Description</th>
                    {tiers.map((t) => (
                      <th key={t.key} className="pb-3 px-3 font-bold text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <t.icon className="w-3.5 h-3.5 text-accentgold" />
                          <span>{t.label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {zones.map((zone) => {
                    const Icon = zoneIcons[zone.id] || Dumbbell;
                    return (
                      <tr key={zone.id} className="hover:bg-slate-900/40 transition-colors">
                        {/* Zone Info */}
                        <td className="py-3.5 pl-2 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs">{zone.name}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 max-w-xs">{zone.description}</div>
                            </div>
                          </div>
                        </td>

                        {/* Tier Columns */}
                        {tiers.map((tier) => {
                          const isAllowed = !!permissions[tier.key]?.[zone.id];
                          return (
                            <td key={tier.key} className="py-3.5 px-3 text-center align-middle">
                              <button
                                onClick={() => updatePermission(tier.key, zone.id, !isAllowed)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm border ${
                                  isAllowed
                                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:scale-105'
                                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30 hover:scale-105'
                                }`}
                                title={`Click to toggle ${tier.key} access to ${zone.name}`}
                              >
                                {isAllowed ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>GRANTED</span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3.5 h-3.5" />
                                    <span>DENIED</span>
                                  </>
                                )}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
              <Info className="w-4 h-4 text-accentgold shrink-0" />
              <span>
                Changes apply instantly across all edge facial cameras in <strong>Borrowdale, Avondale, and CBD</strong> without needing gate reboot.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Real-Time Live Clearance Tester (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accentgold" />
                <span>Live Clearance Simulator</span>
              </h3>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300">
                Interactive Test
              </span>
            </div>

            {/* Select Member to Test */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Member to Evaluate
              </label>
              <select
                value={testMemberId}
                onChange={(e) => setTestMemberId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium cursor-pointer"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.tier} Pass &bull; {m.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Member Profile Card */}
            {selectedMember && (
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white text-xs truncate">{selectedMember.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{selectedMember.id} &bull; {selectedMember.branch}</div>
                  <span
                    className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 border ${
                      selectedMember.tier === 'VIP'
                        ? 'bg-amber-500/20 text-accentgold border-amber-500/40'
                        : selectedMember.tier === 'CORPORATE'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {selectedMember.tier} TIER
                  </span>
                </div>
              </div>
            )}

            {/* Live Computed Access Rights */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Computed Clearance For {selectedMember?.name}
              </div>

              {zones.map((zone) => {
                const Icon = zoneIcons[zone.id] || Dumbbell;
                const isCleared = !!permissions[selectedMember?.tier]?.[zone.id];
                return (
                  <div
                    key={zone.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      isCleared
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                        : 'bg-red-950/20 border-red-500/30 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${isCleared ? 'text-emerald-400' : 'text-red-400'}`} />
                      <span className="font-semibold text-xs">{zone.short}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                        isCleared ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {isCleared ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>{isCleared ? 'GRANTED' : 'DENIED'}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 italic pt-1">
              Toggle any cell in the grid above to watch {selectedMember?.name}'s permissions update instantly.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
