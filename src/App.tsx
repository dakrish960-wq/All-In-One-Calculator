import React, { useState, useEffect } from 'react';
import { CalculatorType, Language, ThemeMode, StartIoConfig } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StandardCalculator } from './components/StandardCalculator';
import { AgeCalculator } from './components/AgeCalculator';
import { GoldCalculator } from './components/GoldCalculator';
import { ViralCalculator } from './components/ViralCalculator';
import { WeightCalculator } from './components/WeightCalculator';
import { CurrencyCalculator } from './components/CurrencyCalculator';
import { LoveCalculator } from './components/LoveCalculator';
import { AdBanner } from './components/AdBanner';
import { ClockCalendar } from './components/ClockCalendar';
import { SettingsModal } from './components/SettingsModal';
import { PromptModal } from './components/PromptModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('standard');
  const [lang, setLang] = useState<Language>('en'); // English by default
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [promptOpen, setPromptOpen] = useState<boolean>(false);

  const [startIoConfig, setStartIoConfig] = useState<StartIoConfig>({
    appId: '206473031',
    enabled: true,
    showBanner: true,
    showInterstitialOnSwitch: true,
    testMode: true,
  });

  // Handle theme class on root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const renderActiveCalculator = () => {
    switch (activeTab) {
      case 'standard':
        return <StandardCalculator lang={lang} />;
      case 'age':
        return <AgeCalculator lang={lang} />;
      case 'gold':
        return <GoldCalculator lang={lang} />;
      case 'viral':
        return <ViralCalculator lang={lang} />;
      case 'weight':
        return <WeightCalculator lang={lang} />;
      case 'currency':
        return <CurrencyCalculator lang={lang} />;
      case 'love':
        return <LoveCalculator lang={lang} />;
      default:
        return <StandardCalculator lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24 sm:pb-12 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenPromptModal={() => setPromptOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        {/* Live Clock & Interactive Calendar Bar */}
        <ClockCalendar />

        {/* Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
        />

        {/* Active Calculator Component View */}
        <div className="my-4">
          {renderActiveCalculator()}
        </div>

        {/* Start.io Simulated Ad Unit */}
        <AdBanner config={startIoConfig} lang={lang} />

        {/* Footer */}
        <footer className="mt-8 mb-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">com.calculator.app</span>
            <span>•</span>
            <span>100% Offline Calculator</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://docs.google.com/document/d/1WE176kjz7U1MgTzbevyo5TntbPuAQVeXIEj0CTkVqCA/edit?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium underline flex items-center gap-1 transition"
            >
              Privacy Policy
            </a>
            <button
              onClick={() => setSettingsOpen(true)}
              className="hover:text-slate-900 dark:hover:text-slate-200 font-medium transition cursor-pointer"
            >
              Settings
            </button>
          </div>
        </footer>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        startIoConfig={startIoConfig}
        setStartIoConfig={setStartIoConfig}
      />

      {/* English Prompt Generator Modal */}
      <PromptModal
        isOpen={promptOpen}
        onClose={() => setPromptOpen(false)}
        lang={lang}
      />
    </div>
  );
}
