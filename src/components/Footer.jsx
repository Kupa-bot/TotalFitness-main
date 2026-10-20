import React from 'react';
import { Shield, Server, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cardbg border-t border-slate-800/80 py-5 px-4 lg:px-8 text-xs text-slate-400 mt-12 transition-all">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-accentgold/20 border border-accentgold/40 flex items-center justify-center text-accentgold font-black text-[10px]">
            TF
          </div>
          <div>
            <span className="font-bold text-white tracking-wide">Total Fitness OMNI-ACCESS Biometric Suite</span>
            <span className="text-slate-500 ml-2">&copy; 2026 Total Fitness Zimbabwe Ltd.</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-accentgold" />
            <span>POPIA & GDPR Compliant</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Edge Nodes Online</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-accentgold" />
            <span>ResNet Biometric Engine v4.2</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
