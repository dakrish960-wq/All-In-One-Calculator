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
    { id: 'standard' as CalculatorType, label: t.navStandard, icon: Calculator, color: 'text-emerald-500' },
    { id: 'age' as CalculatorType, label: t.navAge, icon: Calendar, color: 'text-indigo-500' },
    { id: 'gold' as CalculatorType, label: t.navGold, icon: Coins, color: 'text-amber-500' },
    { id: 'viral' as CalculatorType, label: t.navViral, icon: Sparkles, color: 'text-pink-500' },
    { id: 'weight' as CalculatorType, label: t.navWeight, icon: Scale, color: 'text-teal-500' },
    { id: 'currency' as CalculatorType, label: t.navCurrency, icon: DollarSign, color: 'text-blue-500' },
    { id: 'love' as CalculatorType, label: t.navLove, icon: Heart, color: 'text-rose-500' },
  ];

  return (
    <nav className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-around gap-1 min-w-max py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : tab.color}`} />
              <span className="text-[11px] mt-1 whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
