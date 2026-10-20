import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Network, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Database,
  Lock
} from 'lucide-react';

export default function MeshSyncTab() {
  const { 
    branches, 
    activeBranchId, 
    setActiveBranchId, 
    forceMeshSync, 
    isSyncingMesh 
  } = useFitness();

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Multi-Branch Biometric Edge Mesh</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                Tri-Node Synchronized
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantaneous sub-15ms edge template propagation between Borrowdale HQ, Avondale, and CBD
            </p>
          </div>
        </div>

        <button
          disabled={isSyncingMesh}
          onClick={forceMeshSync}
          className="bg-accentgold hover:bg-accentgoldhover text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50 w-full md:w-auto justify-center"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncingMesh ? 'animate-spin' : ''}`} />
          <span>{isSyncingMesh ? 'Propagating Biometric Hashes...' : 'Force Biometric Mesh Sync'}</span>
        </button>
      </div>

      {/* Visual Network Topology Diagram */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accentgold" />
            <span>Active Edge Node Topology</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Peer-to-Peer Encryption (mTLS)
          </span>
        </div>

        {/* Node Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {branches.map((b) => {
            const isSelected = activeBranchId === b.id;
            const isHQ = b.id === 'borrowdale';

            return (
              <div
                key={b.id}
                onClick={() => setActiveBranchId(b.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-amber-500/10 border-accentgold shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border ${
                        isHQ
                          ? 'bg-accentgold text-black border-amber-300 shadow'
                          : 'bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      {b.code}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{b.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{b.type}</span>
                    </div>
                  </div>

                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
                </div>

                <div className="space-y-1.5 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Edge Cameras:</span>
                    <strong className="text-white font-mono">{b.cams} Feeds Active</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Live Occupancy:</span>
                    <strong className="text-accentgold font-mono">{b.activeMembers} Members In-Club</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Mesh Latency:</span>
                    <strong className="text-emerald-400 font-mono">{b.latency}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Last Synced:</span>
                    <span className="text-slate-300 font-mono">{b.syncedAgo} ago</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400">SHA-256 Hash Match</span>
                  <span className="text-accentgold font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mesh Sync Explanation & Edge Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-accentgold" />
            <span>Autonomous Edge Fallback (Offline Mode)</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            In the event of an internet fiber outage between Borrowdale and Avondale or CBD, each edge node retains its local encrypted biometric cache. VIP members continue to pass through turnstiles and thermal baths with zero interruption.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Zero-trust cryptographic failover operational across 15 camera gateways</span>
          </div>
        </div>

        <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-accentgold" />
            <span>POPIA & GDPR Biometric Vectorization</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Raw camera photos are never stored. The system converts facial landmarks into irreversible 128-dimensional floating-point embeddings hashed with salt, guaranteeing member privacy and institutional security compliance.
          </p>
          <div className="flex items-center gap-2 text-xs text-accentgold font-semibold bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>256-Bit Hardware Security Module (HSM) Template Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
