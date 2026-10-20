import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Users, Crown, KeyRound, Network, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function MetricsBar() {
  const { branches, members, logs, activeBranch } = useFitness();

  const totalMembersCount = branches.reduce((acc, b) => acc + (b.totalMembers || 0), 0);
  const activeNowCount = branches.reduce((acc, b) => acc + (b.activeMembers || 0), 0);
  const vipCount = members.filter((m) => m.tier === 'VIP').length;
  
  const grantedCount = logs.filter((l) => l.status === 'GRANTED').length;
  const passRate = logs.length > 0 ? ((grantedCount / logs.length) * 100).toFixed(1) : '99.9';

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
      {/* Metric 1: Active Members */}
      <div className="bg-cardbg border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
        <div className="absolute -right-3 -bottom-3 text-slate-800/40 text-6xl group-hover:text-amber-500/5 transition-colors pointer-events-none">
          <Users className="w-16 h-16" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Active Members</span>
          <span className="text-[10px] bg-amber-500/10 text-accentgold px-2 py-0.5 rounded-full font-semibold border border-amber-500/20">
            Live Count
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {totalMembersCount.toLocaleString()}
          </span>
          <span className="text-xs text-accentgold font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            +{activeNowCount} in gym
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-accentgold shrink-0" />
          <span>Across Borrowdale, Avondale & CBD</span>
        </div>
      </div>

      {/* Metric 2: VIP Passholders */}
      <div className="bg-cardbg border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
        <div className="absolute -right-3 -bottom-3 text-slate-800/40 text-6xl group-hover:text-amber-500/5 transition-colors pointer-events-none">
          <Crown className="w-16 h-16" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">VIP Passholders</span>
          <span className="text-[10px] bg-amber-500/10 text-accentgold px-2 py-0.5 rounded-full font-semibold border border-amber-500/20">
            Omni Privileged
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-accentgold tracking-tight">
            642 <span className="text-sm font-normal text-slate-400">({vipCount} in tier)</span>
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accentgold"></span>
          <span>Access Lounge, Baths, Canteen & Valet</span>
        </div>
      </div>

      {/* Metric 3: Access Events */}
      <div className="bg-cardbg border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
        <div className="absolute -right-3 -bottom-3 text-slate-800/40 text-6xl group-hover:text-amber-500/5 transition-colors pointer-events-none">
          <KeyRound className="w-16 h-16" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Access Events (1 Hr)</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20">
            Real-Time
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            1,284
          </span>
          <span className="text-xs text-emerald-400 font-semibold">
            {passRate}% Pass Rate
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Avg biometric match speed: 0.24s</span>
        </div>
      </div>

      {/* Metric 4: Node Status */}
      <div className="bg-cardbg border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
        <div className="absolute -right-3 -bottom-3 text-slate-800/40 text-6xl group-hover:text-amber-500/5 transition-colors pointer-events-none">
          <Network className="w-16 h-16" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Node Mesh Status</span>
          <span className="text-[10px] bg-amber-500/10 text-accentgold px-2 py-0.5 rounded-full font-semibold border border-amber-500/20">
            Synchronized
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-accentgold tracking-tight">
            3 / 3
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Active: {activeBranch.shortName}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Edge neural biometric caching active</span>
        </div>
      </div>
    </section>
  );
}
