import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_BRANCHES, 
  INITIAL_ZONES, 
  INITIAL_MEMBERS, 
  INITIAL_LOGS, 
  INITIAL_CANTEEN_MENU, 
  INITIAL_VALET_QUEUE, 
  INITIAL_PERMISSIONS 
} from '../data/initialData';
import { sound } from '../utils/audio';

const FitnessContext = createContext(null);

export function FitnessProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('terminal');

  // Multi-Branch
  const [branches, setBranches] = useState(() => {
    const saved = localStorage.getItem('tf_branches');
    return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
  });
  const [activeBranchId, setActiveBranchId] = useState('borrowdale');

  // Zones
  const [zones] = useState(INITIAL_ZONES);
  const [activeZoneId, setActiveZoneId] = useState('turnstile');

  // Members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('tf_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  // Access Logs
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('tf_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  // Permissions Matrix
  const [permissions, setPermissions] = useState(() => {
    const saved = localStorage.getItem('tf_permissions');
    return saved ? JSON.parse(saved) : INITIAL_PERMISSIONS;
  });

  // Canteen & Valet
  const [canteenMenu] = useState(INITIAL_CANTEEN_MENU);
  const [canteenOrders, setCanteenOrders] = useState(() => {
    const saved = localStorage.getItem('tf_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [valetQueue, setValetQueue] = useState(() => {
    const saved = localStorage.getItem('tf_valet');
    return saved ? JSON.parse(saved) : INITIAL_VALET_QUEUE;
  });

  // System States
  const [emergencyOverride, setEmergencyOverride] = useState(false);
  const [isSyncingMesh, setIsSyncingMesh] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Theme State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('tf_theme');
    return saved ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('tf_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(
      nextTheme === 'light' ? 'Luxury Light Mode Active' : 'Stealth Dark Mode Active',
      nextTheme === 'light' ? 'Switched to daylight platinum aesthetic' : 'Switched to tactical stealth biometric theme',
      'info'
    );
  };

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('tf_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('tf_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('tf_permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem('tf_orders', JSON.stringify(canteenOrders));
  }, [canteenOrders]);

  useEffect(() => {
    localStorage.setItem('tf_valet', JSON.stringify(valetQueue));
  }, [valetQueue]);

  // Toast System
  const showToast = (title, message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sound Control
  const toggleSound = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    sound.muted = newMuted;
    showToast(
      newMuted ? 'Audio Muted' : 'Audio Enabled',
      newMuted ? 'Biometric chimes silenced' : 'Interactive sound effects active',
      'info'
    );
  };

  // Emergency Override
  const triggerEmergencyOverride = () => {
    setEmergencyOverride(true);
    sound.playEmergency();
    const event = {
      id: `EV-OVERRIDE-${Date.now()}`,
      memberId: 'SYSTEM-ROOT',
      name: 'SAFETY DISPATCH',
      tier: 'SECURITY',
      zone: 'All Gates & Turnstiles',
      branch: 'All Branches',
      status: 'OVERRIDE',
      latency: '0.04s',
      timestamp: new Date().toISOString(),
      confidence: 100,
      action: 'FIRE/SAFETY UNLOCK TRIGGERED'
    };
    setLogs((prev) => [event, ...prev]);
    showToast('EMERGENCY GATE OVERRIDE ACTIVATED', 'All turnstiles and thermal doors opened across all 3 branches', 'danger');
  };

  const deactivateEmergencyOverride = () => {
    setEmergencyOverride(false);
    showToast('Override Disengaged', 'Standard biometric security locks restored across all facilities', 'success');
  };

  // Branch Switching
  const handleSelectBranch = (branchId) => {
    setActiveBranchId(branchId);
    const branch = branches.find((b) => b.id === branchId);
    showToast('Management Node Switched', `Active monitoring terminal set to ${branch?.name || branchId}`, 'info');
  };

  // Member Management
  const registerMember = (memberData) => {
    const newId = `TF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMember = {
      id: newId,
      name: memberData.name,
      tier: memberData.tier || 'STANDARD',
      email: memberData.email || `${memberData.name.toLowerCase().replace(/\s+/g, '.')}@totalfitness.co.zw`,
      phone: memberData.phone || '+263 77 000 0000',
      branch: memberData.branch || activeBranchId,
      balance: parseFloat(memberData.balance || 0),
      plate: memberData.plate || 'AFX-0000',
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0],
      lastVisit: 'Just Enrolled',
      biometricQuality: 99.4,
      avatar: memberData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      visitsThisMonth: 1,
      faceDescriptor: memberData.faceDescriptor || null
    };

    setMembers((prev) => [newMember, ...prev]);

    // Add log
    const logEvent = {
      id: `LOG-${Date.now()}`,
      memberId: newId,
      name: newMember.name,
      tier: newMember.tier,
      zone: 'Enrollment Terminal',
      branch: branches.find((b) => b.id === newMember.branch)?.shortName || 'HQ',
      status: 'GRANTED',
      latency: '0.18s',
      timestamp: new Date().toISOString(),
      confidence: 99.4,
      action: 'Biometric Enrollment Sync'
    };
    setLogs((prev) => [logEvent, ...prev]);

    sound.playSuccess();
    showToast(
      'Member Enrolled Successfully',
      `${newMember.name} (#${newId}) propagated across Borrowdale, Avondale & CBD nodes`,
      'success'
    );
    return newMember;
  };

  const toggleMemberStatus = (memberId) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextStatus = m.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          showToast(
            'Member Status Updated',
            `${m.name} is now ${nextStatus}`,
            nextStatus === 'ACTIVE' ? 'success' : 'warning'
          );
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const deleteMember = (memberId) => {
    const mem = members.find((m) => m.id === memberId);
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    showToast('Member Removed', `${mem?.name || 'Member'} biometric template purged from all nodes`, 'info');
  };

  const updateMemberFaceDescriptor = (memberId, descriptor) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, faceDescriptor: descriptor ? Array.from(descriptor) : null } : m))
    );
  };

  const topUpBalance = (memberId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextBal = m.balance + numAmount;
          sound.playCashier();
          showToast('Wallet Reloaded', `Added $${numAmount.toFixed(2)} to ${m.name}. New Balance: $${nextBal.toFixed(2)}`, 'success');
          return { ...m, balance: nextBal };
        }
        return m;
      })
    );
  };

  // Access Logging
  const logAccessEvent = (eventData) => {
    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      latency: (0.15 + Math.random() * 0.15).toFixed(2) + 's',
      confidence: (99.0 + Math.random() * 0.9).toFixed(1),
      ...eventData
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  const clearLogs = () => {
    setLogs([]);
    showToast('Logs Cleared', 'Biometric audit buffer flushed', 'info');
  };

  // Permissions
  const updatePermission = (tier, zoneId, allowed) => {
    setPermissions((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [zoneId]: allowed
      }
    }));
    showToast('Policy Matrix Updated', `${tier} access for ${zoneId} set to ${allowed ? 'GRANTED' : 'DENIED'}`, 'info');
  };

  const resetPermissionsToDefault = () => {
    setPermissions(INITIAL_PERMISSIONS);
    showToast('Security Policy Restored', 'Standard Total Fitness biometric security rules reloaded', 'info');
  };

  // Canteen Purchase
  const purchaseCanteenItem = (memberId, item) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      showToast('Scan Required', 'Please identify a member at the kiosk terminal', 'warning');
      return false;
    }

    if (member.balance < item.price) {
      sound.playDenied();
      showToast('Insufficient Balance', `${member.name} balance ($${member.balance.toFixed(2)}) is below $${item.price.toFixed(2)}`, 'danger');
      return false;
    }

    // Deduct
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return { ...m, balance: m.balance - item.price };
        }
        return m;
      })
    );

    // Record order
    const order = {
      id: `ORD-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      itemName: item.name,
      price: item.price,
      timestamp: new Date().toISOString(),
      branch: branches.find((b) => b.id === activeBranchId)?.shortName || 'HQ'
    };
    setCanteenOrders((prev) => [order, ...prev]);

    // Access log
    logAccessEvent({
      memberId: member.id,
      name: member.name,
      tier: member.tier,
      zone: 'Canteen Kiosk',
      branch: branches.find((b) => b.id === activeBranchId)?.shortName || 'HQ',
      status: 'GRANTED',
      action: `Biometric Token Charged: $${item.price.toFixed(2)}`
    });

    sound.playCashier();
    showToast('Biometric Payment Complete', `Charged $${item.price.toFixed(2)} to ${member.name}. New balance: $${(member.balance - item.price).toFixed(2)}`, 'success');
    return true;
  };

  // Valet Queue
  const updateValetStatus = (valetId, nextStatus) => {
    setValetQueue((prev) =>
      prev.map((item) => {
        if (item.id === valetId) {
          const updated = {
            ...item,
            status: nextStatus,
            progress: nextStatus === 'READY' ? 100 : nextStatus === 'DETAILING' ? 75 : nextStatus === 'WASHING' ? 45 : 15,
            estimatedTime: nextStatus === 'READY' ? 'Ready for Pickup' : '8 mins'
          };
          showToast('Valet Bay Updated', `${item.vehicle} (${item.plate}) marked as ${nextStatus}`, 'info');
          return updated;
        }
        return item;
      })
    );
  };

  const addValetVehicle = (vehicle) => {
    const newEntry = {
      id: `VAL-${Math.floor(100 + Math.random() * 900)}`,
      memberId: vehicle.memberId,
      memberName: vehicle.memberName,
      plate: vehicle.plate,
      vehicle: vehicle.vehicleModel || 'Executive Sedan',
      service: vehicle.service || 'Complimentary VIP Foam Wash',
      bay: `Bay ${Math.floor(1 + Math.random() * 3)}`,
      status: 'IN QUEUE',
      progress: 10,
      estimatedTime: '20 mins',
      branch: activeBranchId
    };
    setValetQueue((prev) => [newEntry, ...prev]);
    showToast('Vehicle Checked In', `${newEntry.vehicle} assigned to ${newEntry.bay}`, 'success');
  };

  // Force Mesh Sync
  const forceMeshSync = () => {
    setIsSyncingMesh(true);
    sound.playScan();
    showToast('Propagating Edge Nodes', 'Transmitting biometric embeddings across Borrowdale, Avondale & CBD...', 'info');

    setTimeout(() => {
      setBranches((prev) =>
        prev.map((b) => ({
          ...b,
          syncedAgo: '0s',
          latency: `${Math.floor(7 + Math.random() * 6)}ms`
        }))
      );
      setIsSyncingMesh(false);
      sound.playSuccess();
      showToast('Mesh Sync Complete', 'All 3 gym nodes synchronized with 100% hash consistency', 'success');
    }, 1200);
  };

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];
  const activeZone = zones.find((z) => z.id === activeZoneId) || zones[0];

  return (
    <FitnessContext.Provider
      value={{
        activeTab,
        setActiveTab,
        branches,
        activeBranchId,
        activeBranch,
        setActiveBranchId: handleSelectBranch,
        zones,
        activeZoneId,
        setActiveZoneId,
        activeZone,
        members,
        registerMember,
        toggleMemberStatus,
        deleteMember,
        updateMemberFaceDescriptor,
        topUpBalance,
        logs,
        logAccessEvent,
        clearLogs,
        permissions,
        updatePermission,
        resetPermissionsToDefault,
        canteenMenu,
        canteenOrders,
        purchaseCanteenItem,
        valetQueue,
        updateValetStatus,
        addValetVehicle,
        emergencyOverride,
        triggerEmergencyOverride,
        deactivateEmergencyOverride,
        isSyncingMesh,
        forceMeshSync,
        soundMuted,
        toggleSound,
        toasts,
        showToast,
        dismissToast,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const ctx = useContext(FitnessContext);
  if (!ctx) throw new Error('useFitness must be used within FitnessProvider');
  return ctx;
}
