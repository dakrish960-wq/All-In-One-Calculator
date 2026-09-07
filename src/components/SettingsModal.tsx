import React from 'react'
import { Language, ThemeMode, StartIoConfig } from '../types'
import { translations } from '../data/translations'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Language
  setLang: (lang: Language) => void
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  startIoConfig: StartIoConfig
  setStartIoConfig: React.Dispatch<React.SetStateAction<StartIoConfig>>
  onShareApp: () => Promise<void> | void
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
  onShareApp,
}) => {
  const t = translations[lang]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {t.settings}
          </h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              {t.language}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLang('en')}
                className={`py-2 rounded-xl font-medium ${
                  lang === 'en'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`py-2 rounded-xl font-medium ${
                  lang === 'bn'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              {t.theme}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`py-2 rounded-xl font-medium ${
                  theme === 'light'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`py-2 rounded-xl font-medium ${
                  theme === 'dark'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`py-2 rounded-xl font-medium ${
                  theme === 'system'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                System
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Ads
            </h3>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Enable Ads
              </span>
              <button
                onClick={() =>
                  setStartIoConfig((prev) => ({
                    ...prev,
                    enabled: !prev.enabled,
                  }))
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  startIoConfig.enabled
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {startIoConfig.enabled ? 'On' : 'Off'}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Banner Ads
              </span>
              <button
                onClick={() =>
                  setStartIoConfig((prev) => ({
                    ...prev,
                    showBanner: !prev.showBanner,
                  }))
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  startIoConfig.showBanner
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {startIoConfig.showBanner ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <button
            onClick={onShareApp}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
          >
            Share App
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
