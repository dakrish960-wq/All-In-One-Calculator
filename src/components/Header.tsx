import React from 'react';
import { Calculator, Globe, Moon, Sun, Settings, Code, WifiOff } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  onOpenSettings: () => void;
  onOpenPromptModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  theme,
  setTheme,
  onOpenSettings,
  onOpenPromptModal,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo & App Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {t.appTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800">
                <WifiOff className="w-3 h-3" />
                {t.offlineStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px] hidden xs:block">
              com.calculator.app
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Prompt Generator / Prompt Modal Button */}
          <button
            onClick={onOpenPromptModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/80 border border-indigo-200/60 dark:border-indigo-800/60 transition-all cursor-pointer"
            title="View English Prompt & Prompt Specifications"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.playStorePrompt}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-bold uppercase">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Settings Modal Toggle */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer"
            title="Settings & App Information"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
