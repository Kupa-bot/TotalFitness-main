import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import confetti from 'canvas-confetti';
import { 
  UtensilsCrossed, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Receipt, 
  Flame, 
  Dumbbell, 
  UserCheck 
} from 'lucide-react';

export default function CanteenTab() {
  const { 
    canteenMenu, 
    canteenOrders, 
    purchaseCanteenItem, 
    members, 
    topUpBalance 
  } = useFitness();

  const [activeCustomerId, setActiveCustomerId] = useState(members[0]?.id || 'TF-8824');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const customer = members.find((m) => m.id === activeCustomerId) || members[0];

  const categories = ['ALL', 'Protein Shakes', 'Fresh Meals', 'Hydration', 'Supplements'];

  const filteredMenu = canteenMenu.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const handlePurchase = (item) => {
    if (!customer) return;
    const success = purchaseCanteenItem(customer.id, item);
    if (success) {
      try {
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#d99b26', '#10b981', '#ffffff']
        });
      } catch {
        // Optional
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Customer Biometric Header */}
      <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-accentgold">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base">Smart Canteen Biometric POS</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                One-Tap Face-Pay
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Charge healthy nutrition & recovery shakes directly to member accounts with facial recognition
            </p>
          </div>
        </div>

        {/* Active Customer Scanner Indicator */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700/80 p-2.5 rounded-2xl w-full md:w-auto">
          {customer ? (
            <>
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-10 h-10 rounded-xl object-cover border border-accentgold/60"
              />
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-accentgold" />
                  <span className="text-xs font-bold text-white truncate">{customer.name}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Wallet Balance: <strong className="text-accentgold font-bold">${customer.balance.toFixed(2)}</strong>
                </div>
              </div>
              <button
                onClick={() => topUpBalance(customer.id, 50)}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-accentgold border border-amber-500/30 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ml-auto"
                title="Top-up $50"
              >
                <Plus className="w-3 h-3" /> $50
              </button>
            </>
          ) : (
            <span className="text-xs text-slate-400">No member identified</span>
          )}
        </div>
      </div>

      {/* Main Split: Menu Grid (8 Cols) & Live POS Terminal (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Menu & Categories */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Customer Switcher & Category Tabs */}
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
            {/* Customer Picker */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Terminal Subject:</span>
              <select
                value={activeCustomerId}
                onChange={(e) => setActiveCustomerId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accentgold font-medium cursor-pointer"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (${m.balance.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-accentgold text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenu.map((item) => {
              const canAfford = customer && customer.balance >= item.price;
              return (
                <div
                  key={item.id}
                  className="bg-cardbg border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cardbg via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                      {item.category}
                    </span>

                    <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded-xl shadow-lg">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-accentgold transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {item.calories}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                        {item.protein}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePurchase(item)}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                        canAfford
                          ? 'bg-accentgold hover:bg-accentgoldhover text-black shadow-amber-500/20 active:scale-95'
                          : 'bg-slate-800 text-slate-400 hover:text-white cursor-pointer'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{canAfford ? '1-Tap Biometric Pay' : `Insufficient Balance ($${customer?.balance.toFixed(2) || '0'})`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Live Orders & POS Receipt Terminal */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-cardbg border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-accentgold" />
                <span>Live Canteen Receipts</span>
              </h3>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">
                {canteenOrders.length} Orders
              </span>
            </div>

            {/* Quick Wallet Reload Card */}
            {customer && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Customer Wallet</span>
                  <span className="font-extrabold text-accentgold text-sm">${customer.balance.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => topUpBalance(customer.id, 10)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold py-1 rounded-lg border border-slate-700 transition-colors"
                  >
                    +$10
                  </button>
                  <button
                    onClick={() => topUpBalance(customer.id, 25)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold py-1 rounded-lg border border-slate-700 transition-colors"
                  >
                    +$25
                  </button>
                  <button
                    onClick={() => topUpBalance(customer.id, 50)}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-accentgold text-[11px] font-bold py-1 rounded-lg border border-amber-500/40 transition-colors"
                  >
                    +$50
                  </button>
                </div>
              </div>
            )}

            {/* Recent Orders List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {canteenOrders.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs italic">
                  No canteen transactions recorded yet. Tap any item on the left to charge via facial biometric token.
                </div>
              ) : (
                canteenOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{ord.itemName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {ord.memberName} &bull; {ord.branch}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                        {new Date(ord.timestamp).toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-accentgold text-xs">
                        -${ord.price.toFixed(2)}
                      </span>
                      <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                        Face Paid
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accentgold shrink-0" />
              <span>Charges settle against members' prepay token balance in real time.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
