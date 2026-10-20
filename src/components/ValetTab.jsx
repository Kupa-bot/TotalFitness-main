import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Car, 
  Clock, 
  ArrowRight, 
  Plus, 
  Crown,
  Check
} from 'lucide-react';

export default function ValetTab() {
  const { valetQueue, updateValetStatus, addValetVehicle, members } = useFitness();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || 'TF-8824');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceType, setServiceType] = useState('Executive Interior & Foam Wash');

  const vipMembers = members.filter((m) => m.tier === 'VIP');

  const handleAdvance = (item) => {
    let next = 'WASHING';
    if (item.status === 'IN QUEUE') next = 'WASHING';
    else if (item.status === 'WASHING') next = 'DETAILING';
    else if (item.status === 'DETAILING') next = 'READY';
    else if (item.status === 'READY') next = 'DISPATCHED';

    if (next === 'DISPATCHED') {
      updateValetStatus(item.id, 'READY');
    } else {
      updateValetStatus(item.id, next);
    }
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    const mem = members.find((m) => m.id === selectedMemberId);
    if (!mem) return;

    addValetVehicle({
      memberId: mem.id,
      memberName: mem.name,
      plate: mem.plate || 'AFX-7711',
      vehicleModel: vehicleModel.trim() || 'BMW X5 M-Sport (Phytonic Blue)',
      service: serviceType
    });

    setVehicleModel('');
    setIsCheckInOpen(false);
  };

  const readyCount = valetQueue.filter((v) => v.status === 'READY').length;
  const inProgressCount = valetQueue.filter((v) => v.status === 'WASHING' || v.status === 'DETAILING').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Valet & Carwash Bay Terminal</h2>
              <span className="text-[10px] bg-amber-500/10 text-accentgold border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                VIP License Plate Recognition
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Complimentary vehicle detailing for VIP Omni Passholders while training
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCheckInOpen(true)}
          className="bg-accentgold hover:bg-accentgoldhover text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Check In VIP Vehicle</span>
        </button>
      </div>

      {/* Bay Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total in Bays</div>
          <div className="text-2xl font-black text-white mt-1">{valetQueue.length} Vehicles</div>
          <div className="text-[11px] text-accentgold mt-1">Across 3 detailing bays</div>
        </div>
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Active Wash / Detailing</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{inProgressCount} In Progress</div>
          <div className="text-[11px] text-slate-400 mt-1">Ceramic foam & rinse</div>
        </div>
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Ready for Pickup</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{readyCount} Vehicles</div>
          <div className="text-[11px] text-slate-400 mt-1">Keys at concierge desk</div>
        </div>
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">ANPR Cam Recognition</div>
          <div className="text-2xl font-black text-accentgold mt-1">100% Match</div>
          <div className="text-[11px] text-slate-400 mt-1">Zero barrier delay</div>
        </div>
      </div>

      {/* Check In Modal */}
      {isCheckInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-cardbg border border-slate-700 rounded-2xl max-w-md w-full p-6 flex flex-col gap-4 shadow-2xl relative">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Car className="w-5 h-5 text-accentgold" />
              <span>Check In Vehicle to Valet Bay</span>
            </h3>
            <p className="text-xs text-slate-400">
              Assign an incoming member's vehicle to an available wash bay.
            </p>

            <form onSubmit={handleCheckInSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  VIP Member
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                >
                  {vipMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.plate || 'No Plate'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Vehicle Model & Color
                </label>
                <input
                  type="text"
                  placeholder="e.g. Audi RSQ8 (Nardo Grey)"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Service Package
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
                >
                  <option value="Executive Interior & Foam Wash">Executive Interior & Foam Wash</option>
                  <option value="Exterior Foam & Wheel Ceramic">Exterior Foam & Wheel Ceramic</option>
                  <option value="Express Rinse & Chamois Dry">Express Rinse & Chamois Dry</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCheckInOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-accentgold hover:bg-accentgoldhover text-black text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Assign to Bay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Valet Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {valetQueue.map((item) => {
          const isReady = item.status === 'READY';
          const isDetailing = item.status === 'DETAILING';
          const isWashing = item.status === 'WASHING';

          let statusBadgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
          if (isReady) statusBadgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
          else if (isDetailing) statusBadgeColor = 'bg-amber-500/20 text-accentgold border-amber-500/40';
          else if (isWashing) statusBadgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/40';

          return (
            <div
              key={item.id}
              className="bg-cardbg border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xl relative overflow-hidden transition-all"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isReady ? 'bg-emerald-500' : isDetailing ? 'bg-accentgold' : 'bg-blue-500'
                }`}
              />

              {/* Vehicle Title & Plate */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.bay}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1.5 leading-snug">
                    {item.vehicle}
                  </h3>
                  <div className="text-[11px] font-mono font-bold text-accentgold mt-0.5">
                    PLATE: {item.plate}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shrink-0 ${statusBadgeColor}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Service & Member */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[11px]">VIP Member:</span>
                  <span className="font-bold flex items-center gap-1 text-white">
                    <Crown className="w-3 h-3 text-accentgold" />
                    {item.memberName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[11px]">Service:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[180px]">{item.service}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[11px]">Est. Time:</span>
                  <span className="font-semibold text-accentgold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
                  <span>Wash Phase Progress</span>
                  <span className="text-white font-mono">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isReady ? 'bg-emerald-500' : 'bg-accentgold'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <button
                  onClick={() => handleAdvance(item)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                    isReady
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isReady ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Ready for Member Collection</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-3.5 h-3.5 text-accentgold" />
                      <span>Advance to Next Stage</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
