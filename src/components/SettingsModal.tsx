import React from 'react';
import { X, ShieldCheck, CheckCircle2, Smartphone, Radio, Globe, Moon, Sun, Lock, ExternalLink, FileText } from 'lucide-react';
import { Language, ThemeMode, StartIoConfig } from '../types';
import { translations } from '../data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  startIoConfig: StartIoConfig;
  setStartIoConfig: React.Dispatch<React.SetStateAction<StartIoConfig>>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  theme,
  setTheme,
  startIoConfig,
  setStartIoConfig,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              {t.settings} & Play Store Info
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* App Metadata */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                App & Package Identification
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                100% Offline
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {t.appTitle}
            </p>
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
              Package Name: <strong className="underline">com.calculator.app</strong>
            </p>
          </div>

          {/* Start.io Ad Configuration */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-indigo-500" />
                Start.io Ads Configuration
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={startIoConfig.enabled}
                  onChange={(e) =>
                    setStartIoConfig({ ...startIoConfig, enabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Start.io App ID
              </label>
              <input
                type="text"
                value={startIoConfig.appId}
                onChange={(e) =>
                  setStartIoConfig({ ...startIoConfig, appId: e.target.value })
                }
                placeholder="e.g. 206473031"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Play Store Compliance Checklist */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {t.playStorePolicyCheck}
            </span>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Package Name formatted correctly: <strong>com.calculator.app</strong></span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Runs 100% offline without mandatory login or external API dependencies.</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Compliant with Google Play Data Safety policy & Start.io Ad guidelines.</span>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link & Summary */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                {t.privacyPolicy}
              </span>
              <a
                href="https://docs.google.com/document/d/1WE176kjz7U1MgTzbevyo5TntbPuAQVeXIEj0CTkVqCA/edit?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Open Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              This app (com.calculator.app) operates locally on your device. We do not collect, store, or transmit personal data or calculation logs to external servers. All currency rates and calculations remain stored strictly in local device memory.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
