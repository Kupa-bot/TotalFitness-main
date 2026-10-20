import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import Header from './components/Header';
import MetricsBar from './components/MetricsBar';
import GateTerminalTab from './components/GateTerminalTab';
import MembersTab from './components/MembersTab';
import PolicyMatrixTab from './components/PolicyMatrixTab';
import CanteenTab from './components/CanteenTab';
import ValetTab from './components/ValetTab';
import AnalyticsTab from './components/AnalyticsTab';
import MeshSyncTab from './components/MeshSyncTab';
import ToastContainer from './components/ToastContainer';
import RegisterModal from './components/RegisterModal';
import Footer from './components/Footer';

function MainContent() {
  const { activeTab } = useFitness();

  return (
    <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto flex flex-col gap-6">
      {/* Top Real-Time Metrics Bar */}
      <MetricsBar />

      {/* Dynamic Tab Views */}
      <div className="transition-all duration-200">
        {activeTab === 'terminal' && <GateTerminalTab />}
        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'matrix' && <PolicyMatrixTab />}
        {activeTab === 'canteen' && <CanteenTab />}
        {activeTab === 'valet' && <ValetTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'mesh' && <MeshSyncTab />}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <FitnessProvider>
      <div className="min-h-screen bg-darkbg flex flex-col selection:bg-accentgold selection:text-black transition-colors duration-250">
        {/* Navigation & Global Status Header */}
        <Header />

        {/* Core Application Body */}
        <MainContent />

        {/* Global Footer */}
        <Footer />

        {/* Floating Biometric Toast Alerts */}
        <ToastContainer />

        {/* Member Enrollment Modal */}
        <RegisterModal />
      </div>
    </FitnessProvider>
  );
}
