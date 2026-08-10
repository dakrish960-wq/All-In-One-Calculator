import React from 'react';
import { Calculator, Calendar, Coins, Sparkles, Scale, DollarSign, Heart } from 'lucide-react';
import { CalculatorType, Language } from '../types';
import { translations } from '../data/translations';

interface NavigationProps {
  activeTab: CalculatorType;
  setActiveTab: (tab: CalculatorType) => void;
  lang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  lang,
}) => {
  const t = translations[lang];

  const tabs = [
    { id: 'standard' as CalculatorType, label: t.navStandard, icon: Calculator, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'age' as CalculatorType, label: t.navAge, icon: Calendar, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'gold' as CalculatorType, label: t.navGold, icon: Coins, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'viral' as CalculatorType, label: t.navViral, icon: Sparkles, color: 'text-pink-500 bg-pink-500/10' },
    { id: 'weight' as CalculatorType, label: t.navWeight, icon: Scale, color: 'text-teal-500 bg-teal-500/10' },
    { id: 'currency' as CalculatorType, label: t.navCurrency, icon: DollarSign, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'love' as CalculatorType, label: t.navLove, icon: Heart, color: 'text-rose-500 bg-rose-500/10' },
  ];

  return (
    <>
      {/* Top Desktop Nav Bar */}
      <nav className="w-full bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 my-4 shadow-inner">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-slate-950/40 ring-1 ring-slate-200 dark:ring-slate-700 font-semibold scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? tab.color.split(' ')[0] : 'text-slate-500'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-500/10' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
