import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  Crown, 
  Car, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  Trash2, 
  Scan, 
  Building2
} from 'lucide-react';

export default function MembersTab() {
  const { 
    members, 
    setIsRegisterModalOpen, 
    toggleMemberStatus, 
    deleteMember, 
    topUpBalance, 
    setActiveTab, 
    branches,
    showToast
  } = useFitness();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  // Filter members
  const filteredMembers = members.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.plate && m.plate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.phone && m.phone.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTier = selectedTier === 'ALL' || m.tier === selectedTier;
    const matchesBranch = selectedBranch === 'ALL' || m.branch === selectedBranch;

    return matchesSearch && matchesTier && matchesBranch;
  });

  const vipCount = members.filter((m) => m.tier === 'VIP').length;
  const corporateCount = members.filter((m) => m.tier === 'CORPORATE').length;
  const standardCount = members.filter((m) => m.tier === 'STANDARD').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Biometric Member Registry</h2>
              <span className="text-[10px] bg-amber-500/10 text-accentgold border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                Multi-Branch Synchronization
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {members.length} registered facial templates &bull; {vipCount} VIP Omni passholders
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="bg-accentgold hover:bg-accentgoldhover text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all w-full md:w-auto justify-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Member</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by member name, ID (#TF-8824), car plate, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Tier Filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setSelectedTier('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedTier === 'ALL' ? 'bg-accentgold text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tiers ({members.length})
            </button>
            <button
              onClick={() => setSelectedTier('VIP')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedTier === 'VIP' ? 'bg-amber-500/20 text-accentgold font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              VIP ({vipCount})
            </button>
            <button
              onClick={() => setSelectedTier('CORPORATE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedTier === 'CORPORATE' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Corp ({corporateCount})
            </button>
            <button
              onClick={() => setSelectedTier('STANDARD')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedTier === 'STANDARD' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard ({standardCount})
            </button>
          </div>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accentgold font-medium shrink-0 cursor-pointer"
          >
            <option value="ALL">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => {
          const isSuspended = member.status === 'SUSPENDED';
          const isVIP = member.tier === 'VIP';
          const isCorp = member.tier === 'CORPORATE';
          const branchObj = branches.find((b) => b.id === member.branch);

          return (
            <div
              key={member.id}
              className={`bg-cardbg border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden group ${
                isSuspended ? 'border-red-500/40 opacity-75' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Accent Stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isVIP ? 'bg-gradient-to-r from-amber-500 to-amber-300' : isCorp ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />

              {/* Card Header: Avatar & Info */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="relative shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-md group-hover:border-accentgold transition-colors"
                  />
                  {isVIP && (
                    <div className="absolute -top-1.5 -right-1.5 bg-accentgold text-black rounded-full p-1 shadow">
                      <Crown className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-white text-sm truncate">{member.name}</h3>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                        isVIP
                          ? 'bg-amber-500/20 text-accentgold border border-amber-500/40'
                          : isCorp
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {member.tier}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    ID: <strong className="text-slate-300">{member.id}</strong>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1 truncate">
                    <Building2 className="w-3.5 h-3.5 text-accentgold shrink-0" />
                    <span>{branchObj?.shortName || member.branch}</span>
                  </div>
                </div>
              </div>

              {/* Details Pill Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Face Template</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white text-xs">{member.biometricQuality || '99.6'}% Match</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                    <span>Canteen Wallet</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-extrabold text-accentgold text-xs">
                      ${(member.balance || 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => topUpBalance(member.id, 25)}
                      title="Add $25 to wallet balance"
                      className="text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-accentgold border border-amber-500/30 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" /> $25
                    </button>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-800/80">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Plate (Valet)</div>
                  <div className="mt-0.5 flex items-center gap-1 font-mono text-slate-200 text-[11px]">
                    <Car className="w-3 h-3 text-slate-400" />
                    <span>{member.plate || 'No Plate'}</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-800/80">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Activity</div>
                  <div className="mt-0.5 text-slate-200 text-[11px] font-semibold">
                    {member.visitsThisMonth || 0} visits this mo.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setActiveTab('terminal');
                    showToast('Testing Gate Scan', `Loaded ${member.name} into Live Gate Terminal for immediate testing`, 'info');
                  }}
                  className="bg-slate-900 hover:bg-amber-500/10 text-slate-200 hover:text-accentgold border border-slate-700/80 hover:border-amber-500/30 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 flex-1 justify-center"
                >
                  <Scan className="w-3.5 h-3.5 text-accentgold" />
                  <span>Test Gate</span>
                </button>

                <button
                  onClick={() => toggleMemberStatus(member.id)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    isSuspended
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{isSuspended ? 'Reactivate' : 'Suspend'}</span>
                </button>

                <button
                  onClick={() => deleteMember(member.id)}
                  title="Purge member biometrics from all nodes"
                  className="text-slate-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <AlertCircle className="w-10 h-10 text-slate-500" />
          <h4 className="text-white font-bold text-sm">No members match your criteria</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Try adjusting your search query or tier/branch filters, or enroll a new biometric profile.
          </p>
        </div>
      )}
    </div>
  );
}
