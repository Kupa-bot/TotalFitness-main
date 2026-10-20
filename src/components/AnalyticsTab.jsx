import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  BarChart3, 
  Download, 
  Trash2, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

export default function AnalyticsTab() {
  const { logs, clearLogs, showToast } = useFitness();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.branch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalLogs = logs.length;
  const grantedCount = logs.filter((l) => l.status === 'GRANTED').length;
  const deniedCount = logs.filter((l) => l.status === 'DENIED').length;
  const passRate = totalLogs > 0 ? ((grantedCount / totalLogs) * 100).toFixed(1) : '99.8';

  const exportCSV = () => {
    if (logs.length === 0) {
      showToast('No Data', 'No logs available to export', 'warning');
      return;
    }
    const headers = ['Event ID', 'Member ID', 'Name', 'Tier', 'Zone', 'Branch', 'Status', 'Confidence', 'Latency', 'Timestamp', 'Action'];
    const rows = logs.map((l) => [
      l.id,
      l.memberId,
      `"${l.name}"`,
      l.tier,
      `"${l.zone}"`,
      `"${l.branch}"`,
      l.status,
      l.confidence || '99.5',
      l.latency || '0.2s',
      l.timestamp,
      `"${l.action || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `total_fitness_audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Audit Log Exported', 'CSV downloaded for POPIA / GDPR regulatory compliance', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Security Audit Logs & Analytics</h2>
              <span className="text-[10px] bg-amber-500/10 text-accentgold border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                POPIA Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive immutable biometric access trail across Borrowdale, Avondale, and CBD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={exportCSV}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 flex-1 md:flex-initial justify-center shadow"
          >
            <Download className="w-3.5 h-3.5 text-accentgold" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={clearLogs}
            className="bg-slate-900 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 flex-1 md:flex-initial justify-center shadow"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Flush Buffer</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Scans Recorded</div>
          <div className="text-2xl font-black text-white mt-1">{totalLogs} Events</div>
          <div className="text-[11px] text-accentgold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live edge stream
          </div>
        </div>

        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Pass Clearance Rate</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{passRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {grantedCount} Granted / {deniedCount} Denied
          </div>
        </div>

        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Mean Neural Latency</div>
          <div className="text-2xl font-black text-accentgold mt-1">0.21s</div>
          <div className="text-[11px] text-slate-400 mt-1">Sub-second turnstile opening</div>
        </div>

        <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Peak Access Hour</div>
          <div className="text-2xl font-black text-white mt-1">17:00 - 19:30</div>
          <div className="text-[11px] text-slate-400 mt-1">After-work executive rush</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail by name, member ID, facility zone, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accentgold font-medium"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'ALL' ? 'bg-accentgold text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({logs.length})
          </button>
          <button
            onClick={() => setStatusFilter('GRANTED')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'GRANTED' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Granted ({grantedCount})
          </button>
          <button
            onClick={() => setStatusFilter('DENIED')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'DENIED' ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Denied ({deniedCount})
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Event & Time</th>
                <th className="py-3 px-4 font-bold">Member & Tier</th>
                <th className="py-3 px-4 font-bold">Facility Zone</th>
                <th className="py-3 px-4 font-bold">Branch Node</th>
                <th className="py-3 px-4 font-bold text-center">Neural Match</th>
                <th className="py-3 px-4 font-bold text-center">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 italic">
                    No biometric log entries match your filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isGranted = log.status === 'GRANTED';
                  const dateStr = log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Recent';

                  return (
                    <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                      {/* Event & Time */}
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-300 font-semibold">{log.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </div>
                      </td>

                      {/* Member & Tier */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{log.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">({log.memberId})</span>
                        </div>
                        <div className="mt-0.5">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              log.tier === 'VIP'
                                ? 'bg-amber-500/20 text-accentgold'
                                : log.tier === 'CORPORATE'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {log.tier}
                          </span>
                        </div>
                      </td>

                      {/* Zone */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{log.zone}</div>
                        <div className="text-[10px] text-slate-400 italic mt-0.5 truncate max-w-xs">
                          {log.action || log.reason || 'Biometric Verification'}
                        </div>
                      </td>

                      {/* Branch */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-300">{log.branch}</span>
                      </td>

                      {/* Neural Match */}
                      <td className="py-3 px-4 text-center">
                        <div className="font-mono font-bold text-slate-200 text-xs">
                          {log.confidence || '99.5'}%
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {log.latency || '0.22s'}
                        </div>
                      </td>

                      {/* Decision */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border tracking-wider ${
                            isGranted
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-red-500/10 text-red-400 border-red-500/30'
                          }`}
                        >
                          {isGranted ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{log.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
