import React, { useState, useEffect, useRef } from 'react';
import { useFitness } from '../context/FitnessContext';
import { sound } from '../utils/audio';
import { 
  Camera, 
  RotateCw, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Users, 
  Lock, 
  Unlock, 
  Sparkles,
  Zap,
  Radio,
  Dumbbell,
  Crown,
  Waves,
  Utensils,
  Car
} from 'lucide-react';

export default function GateTerminalTab() {
  const { 
    zones, 
    activeZoneId, 
    setActiveZoneId, 
    members, 
    permissions, 
    logs, 
    logAccessEvent, 
    branches, 
    activeBranchId,
    emergencyOverride,
    soundMuted,
    toggleSound,
    showToast
  } = useFitness();

  const canvasRef = useRef(null);

  // Current detected subject state in the HUD
  const [currentScan, setCurrentScan] = useState(() => {
    const defaultMember = members[0] || {
      id: 'TF-8824',
      name: 'Tarie Mafusire',
      tier: 'VIP',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    return {
      id: defaultMember.id,
      name: defaultMember.name,
      tier: defaultMember.tier,
      avatar: defaultMember.avatar,
      confidence: 99.8,
      status: 'GRANTED',
      reason: 'Biometric Template Authenticated',
      latency: '0.18s'
    };
  });

  const [isScanning, setIsScanning] = useState(false);
  const [logFilter, setLogFilter] = useState('ALL');

  const activeZone = zones.find((z) => z.id === activeZoneId) || zones[0];
  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  // Particle Mesh Animation Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particles = [];
    const particleCount = 42;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle futuristic grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const step = 32;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connecting lines and particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#d99b26';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.strokeStyle = `rgba(217, 155, 38, ${0.25 * (1 - dist / 85)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Determine access decision based on member tier and current active zone policy
  const evaluateAccess = (member, zoneId) => {
    if (emergencyOverride) {
      return {
        status: 'GRANTED',
        reason: 'Master Safety Override Active'
      };
    }

    if (!member) {
      return {
        status: 'DENIED',
        reason: 'Unknown/Unregistered Face Biometric'
      };
    }

    if (member.status === 'SUSPENDED') {
      return {
        status: 'DENIED',
        reason: 'Membership Suspended (Billing)'
      };
    }

    const tierPermissions = permissions[member.tier] || {};
    const isAllowed = !!tierPermissions[zoneId];

    if (isAllowed) {
      return {
        status: 'GRANTED',
        reason: `${member.tier} Clearance Authenticated`
      };
    } else {
      return {
        status: 'DENIED',
        reason: `Zone Restricted for ${member.tier} Tier`
      };
    }
  };

  // Perform a simulated scan for a chosen member
  const executeScan = (member, customZoneId = activeZoneId) => {
    setIsScanning(true);
    sound.playScan();

    const latencyNum = (0.12 + Math.random() * 0.14).toFixed(2);
    const confidenceNum = member ? (99.2 + Math.random() * 0.7).toFixed(1) : (68.4 + Math.random() * 10).toFixed(1);

    setTimeout(() => {
      const evaluation = evaluateAccess(member, customZoneId);
      const isGranted = evaluation.status === 'GRANTED';

      if (isGranted) {
        sound.playSuccess();
      } else {
        sound.playDenied();
      }

      const scanResult = {
        id: member ? member.id : 'UNREGISTERED',
        name: member ? member.name : 'Unknown Subject',
        tier: member ? member.tier : 'RESTRICTED',
        avatar: member ? member.avatar : null,
        confidence: confidenceNum,
        status: evaluation.status,
        reason: evaluation.reason,
        latency: `${latencyNum}s`
      };

      setCurrentScan(scanResult);
      setIsScanning(false);

      // Record to audit logs
      logAccessEvent({
        memberId: scanResult.id,
        name: scanResult.name,
        tier: scanResult.tier,
        zone: zones.find((z) => z.id === customZoneId)?.short || customZoneId,
        branch: activeBranch?.shortName || 'Borrowdale HQ',
        status: scanResult.status,
        confidence: confidenceNum,
        latency: `${latencyNum}s`,
        action: evaluation.reason
      });

      showToast(
        isGranted ? 'Biometric Access Granted' : 'Biometric Access Denied',
        `${scanResult.name} at ${zones.find((z) => z.id === customZoneId)?.name}: ${evaluation.reason}`,
        isGranted ? 'success' : 'danger'
      );
    }, 450);
  };

  // Random member scan test
  const handleRandomScan = () => {
    if (members.length === 0) return;
    const randomIndex = Math.floor(Math.random() * members.length);
    executeScan(members[randomIndex]);
  };

  // Unregistered intruder simulation
  const handleIntruderSimulation = () => {
    executeScan(null);
  };

  // Filter logs for bottom ticker
  const filteredLogs = logs.filter((l) => {
    if (logFilter === 'GRANTED') return l.status === 'GRANTED';
    if (logFilter === 'DENIED') return l.status === 'DENIED';
    return true;
  });

  const zoneIcons = {
    turnstile: Dumbbell,
    vip: Crown,
    baths: Waves,
    canteen: Utensils,
    carwash: Car
  };

  const isGranted = currentScan.status === 'GRANTED';

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Fast Zone Switcher */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Multi-Gate Biometric Terminal</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                Live Recognition Feed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Active Node: <span className="text-slate-200 font-medium">{activeBranch.name}</span> &bull; {activeBranch.cams} AI Edge Cameras Connected
            </p>
          </div>
        </div>

        {/* Facility Zone Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {zones.map((zone) => {
            const Icon = zoneIcons[zone.id] || Dumbbell;
            const isSelected = activeZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  const memberToTest = members.find((m) => m.id === currentScan.id) || members[0];
                  if (memberToTest) executeScan(memberToTest, zone.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-accentgold text-black shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{zone.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Terminal Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Simulated Camera Viewport & HUD (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden shadow-2xl">
            {/* Viewport Frame */}
            <div className="camera-viewport-screen relative w-full h-[360px] md:h-[420px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
              
              {/* Canvas 2D Particle Neural Mesh */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

              {/* Laser Scanline */}
              <div className="scan-line pointer-events-none" />

              {/* Viewport Corner Tech Accents */}
              <div className="absolute top-3 left-3 pointer-events-none z-20 flex flex-col gap-1">
                <span className="text-[11px] font-mono bg-black/80 backdrop-blur text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <Camera className="w-3.5 h-3.5 text-accentgold" />
                  <span className="text-white font-bold">{activeZone.camCode}: {activeZone.name}</span>
                </span>
                <span className="text-[10px] font-mono bg-black/80 backdrop-blur text-slate-400 px-2.5 py-0.5 rounded-lg border border-slate-800 flex items-center gap-2">
                  <span>1080p 60FPS</span>
                  <span>&bull;</span>
                  <span>Match Latency: {currentScan.latency}</span>
                  <span>&bull;</span>
                  <span className="text-accentgold font-bold">ResNet-Face-v4</span>
                </span>
              </div>

              <div className="absolute top-3 right-3 pointer-events-none z-20 flex items-center gap-2">
                <span className="text-[10px] font-mono bg-black/80 backdrop-blur text-accentgold px-2.5 py-1 rounded-lg border border-accentgold/30 flex items-center gap-1 shadow">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>EMBEDDING ACTIVE</span>
                </span>
              </div>

              {/* Center Bounding Box & Subject HUD */}
              <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
                <div
                  className={`w-60 md:w-64 h-72 md:h-80 rounded-2xl relative shadow-2xl flex flex-col justify-between p-3.5 transition-all duration-300 backdrop-blur-[2px] ${
                    isGranted
                      ? 'border-2 border-accentgold bg-accentgold/5 shadow-[0_0_35px_rgba(217,155,38,0.25)]'
                      : 'border-2 border-red-500 bg-red-500/10 shadow-[0_0_35px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  {/* Four Corner Target Brackets */}
                  <div className={`absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 ${isGranted ? 'border-accentgold' : 'border-red-400'}`}></div>
                  <div className={`absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 ${isGranted ? 'border-accentgold' : 'border-red-400'}`}></div>
                  <div className={`absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 ${isGranted ? 'border-accentgold' : 'border-red-400'}`}></div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 ${isGranted ? 'border-accentgold' : 'border-red-400'}`}></div>

                  {/* Top HUD Tag Inside Box */}
                  <div className="flex justify-between items-center text-[10px] font-mono bg-black/80 px-2.5 py-1 rounded-lg border border-slate-700 shadow">
                    <span className="text-slate-300 font-semibold">{currentScan.id}</span>
                    <span className={`font-bold ${isGranted ? 'text-accentgold' : 'text-red-400'}`}>
                      {currentScan.confidence}% Match
                    </span>
                  </div>

                  {/* Center Subject Identity Display */}
                  <div className="flex flex-col items-center justify-center my-auto text-center">
                    <div className="relative mb-2">
                      {currentScan.avatar ? (
                        <img
                          src={currentScan.avatar}
                          alt={currentScan.name}
                          className={`w-20 h-20 rounded-full object-cover border-2 shadow-xl ${
                            isGranted ? 'border-accentgold' : 'border-red-500'
                          }`}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-red-400 text-3xl shadow-xl">
                          <XCircle className="w-10 h-10" />
                        </div>
                      )}
                      
                      {/* Sub-badge over avatar */}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border ${
                        isGranted ? 'bg-amber-500 border-amber-300' : 'bg-red-600 border-red-400'
                      }`}>
                        {isGranted ? <CheckCircle className="w-3.5 h-3.5 text-black" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div className="font-extrabold text-white text-sm md:text-base tracking-wide drop-shadow">
                      {currentScan.name}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 justify-center">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          currentScan.tier === 'VIP'
                            ? 'bg-amber-500/20 text-accentgold border-amber-500/40'
                            : currentScan.tier === 'CORPORATE'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                            : currentScan.tier === 'STANDARD'
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-red-500/20 text-red-400 border-red-500/40'
                        }`}
                      >
                        {currentScan.tier} Pass
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 mt-1 font-medium italic">
                      {currentScan.reason}
                    </div>
                  </div>

                  {/* Bottom Decision Banner */}
                  <div
                    className={`text-center font-extrabold text-xs py-1.5 rounded-xl shadow-lg flex items-center justify-center gap-1.5 ${
                      isGranted
                        ? 'bg-accentgold text-black shadow-amber-500/20'
                        : 'bg-red-600 text-white shadow-red-600/30'
                    }`}
                  >
                    {isGranted ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{isGranted ? 'ACCESS GRANTED • GATE OPEN' : 'ACCESS DENIED • GATE LOCKED'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Right HUD Controls */}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                <button
                  onClick={toggleSound}
                  title="Toggle biometric audio feedback"
                  className="bg-black/80 hover:bg-black text-slate-300 border border-slate-700 p-2 rounded-xl text-xs flex items-center gap-1 shadow transition-all"
                >
                  {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-accentgold" />}
                </button>

                <button
                  disabled={isScanning}
                  onClick={handleRandomScan}
                  className="bg-accentgold hover:bg-accentgoldhover text-black font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>Next Scan Test</span>
                </button>
              </div>

            </div>

            {/* Zone Description Under Viewport */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accentgold" />
                <span><strong>Coverage:</strong> {activeZone.description}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Terminal ID: TF-GATE-{activeZone.id.toUpperCase()}</span>
            </div>

          </div>
        </div>

        {/* RIGHT: Interactive Test Bench & Policy Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Simulation Card */}
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accentgold" />
                <span>Biometric Test Console</span>
              </h3>
              <span className="text-xs bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300">
                Interactive Testing
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Select any registered member or simulate an unregistered intruder to test how Total Fitness OMNI-ACCESS handles instant biometric authentication across branches.
            </p>

            {/* Test Individual Member Picker */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Test Specific Member Biometrics
              </label>
              <div className="grid grid-cols-1 gap-2">
                {members.slice(0, 5).map((m) => {
                  const isCurrent = currentScan.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => executeScan(m)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{m.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({m.id})</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {m.tier} Pass &bull; {m.branch} &bull; Plate: {m.plate}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider ${
                          m.tier === 'VIP'
                            ? 'bg-amber-500/20 text-accentgold border border-amber-500/30'
                            : m.tier === 'CORPORATE'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {m.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation Trigger Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleRandomScan}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-accentgold" />
                <span>Random Scan</span>
              </button>

              <button
                onClick={handleIntruderSimulation}
                className="bg-slate-900 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulate Intruder</span>
              </button>
            </div>

          </div>

          {/* Current Zone Access Rules Summary */}
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Gate Rules for {activeZone.name}</span>
              <span className="text-[10px] text-accentgold font-mono">Enforced by AI</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300">VIP Omni Pass</span>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Granted (All 3 Branches)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300">Corporate Executive</span>
                <span className={`text-[11px] font-bold flex items-center gap-1 ${
                  permissions.CORPORATE?.[activeZoneId] ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {permissions.CORPORATE?.[activeZoneId] ? (
                    <><CheckCircle className="w-3.5 h-3.5" /> Granted</>
                  ) : (
                    <><XCircle className="w-3.5 h-3.5" /> Restricted</>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300">Standard Floor Pass</span>
                <span className={`text-[11px] font-bold flex items-center gap-1 ${
                  permissions.STANDARD?.[activeZoneId] ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {permissions.STANDARD?.[activeZoneId] ? (
                    <><CheckCircle className="w-3.5 h-3.5" /> Granted</>
                  ) : (
                    <><XCircle className="w-3.5 h-3.5" /> Restricted</>
                  )}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM: Real-time Biometric Access Log Feed */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm tracking-wide flex items-center gap-2">
              <Radio className="w-4 h-4 text-accentgold animate-pulse" />
              <span>Real-Time Biometric Access Stream</span>
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
              {logs.length} Total Events
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setLogFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  logFilter === 'ALL' ? 'bg-accentgold text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setLogFilter('GRANTED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  logFilter === 'GRANTED' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Granted
              </button>
              <button
                onClick={() => setLogFilter('DENIED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  logFilter === 'DENIED' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Denied
              </button>
            </div>
          </div>
        </div>

        {/* Access Log Rows */}
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs italic">
              No access logs found for the selected filter.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const logGranted = log.status === 'GRANTED';
              return (
                <div
                  key={log.id}
                  className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 p-3 rounded-xl flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        logGranted
                          ? 'bg-amber-500/10 text-accentgold border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {logGranted ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{log.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({log.memberId})</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          log.tier === 'VIP' ? 'bg-amber-500/20 text-accentgold' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {log.tier}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {log.zone} &bull; {log.branch} &bull; <span className="text-slate-300 italic">{log.action || log.reason}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="hidden sm:block">
                      <div className="text-[10px] font-mono text-slate-400">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Just now'}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Latency: {log.latency} &bull; {log.confidence}%
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border tracking-wider ${
                        logGranted
                          ? 'bg-amber-500/10 text-accentgold border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
