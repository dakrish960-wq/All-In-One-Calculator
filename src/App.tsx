import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { StandardCalculator } from './components/StandardCalculator'
import { AgeCalculator } from './components/AgeCalculator'
import { GoldCalculator } from './components/GoldCalculator'
import { ViralCalculator } from './components/ViralCalculator'
import { WeightCalculator } from './components/WeightCalculator'
import { CurrencyCalculator } from './components/CurrencyCalculator'
import { LoveCalculator } from './components/LoveCalculator'
import { SettingsModal } from './components/SettingsModal'
import { CalculatorType, Language, ThemeMode, StartIoConfig } from './types'
import { StartIo } from './lib/startIo'
import './App.css'

function App() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [activeTab, setActiveTab] = useState<CalculatorType>('standard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [startIoConfig, setStartIoConfig] = useState<StartIoConfig>({
    appId: '207279640',
    enabled: true,
    showBanner: true,
    showInterstitialOnSwitch: true,
    testMode: true,
  })

  // Start.io Interstitial preload
  useEffect(() => {
    if (startIoConfig.enabled) {
      StartIo.loadInterstitial().catch(() => {})
    }
  }, [startIoConfig.enabled])

  return (
    <div
      className={
        theme === 'dark'
          ? 'dark bg-slate-950 text-slate-100 h-screen flex flex-col font-sans overflow-hidden'
          : 'bg-slate-100 text-slate-900 h-screen flex flex-col font-sans overflow-hidden'
      }
    >

      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 pt-3 pb-2 overflow-y-auto space-y-4">

        <div className="w-full">
          {activeTab === 'standard' && <StandardCalculator lang={lang} />}
          {activeTab === 'age' && <AgeCalculator lang={lang} />}
          {activeTab === 'gold' && <GoldCalculator lang={lang} />}
          {activeTab === 'viral' && <ViralCalculator lang={lang} />}
          {activeTab === 'weight' && <WeightCalculator lang={lang} />}
          {activeTab === 'currency' && <CurrencyCalculator lang={lang} />}
          {activeTab === 'love' && <LoveCalculator lang={lang} />}
        </div>

        {/* Privacy Policy & Settings */}
        <div className="pt-2 pb-2 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 gap-3 text-center">
          <a
            href="https://docs.google.com/document/d/1WE176kjz7U1MgTzbevyo5TntbPuAQVeXIEj0CTkVqCA/edit?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium underline"
          >
            Privacy Policy
          </a>

          <span>•</span>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hover:text-slate-900 dark:hover:text-slate-200 font-medium cursor-pointer"
          >
            Settings
          </button>
        </div>

        {/* Start.io Banner Ad Space */}
        {startIoConfig.enabled && startIoConfig.showBanner && (
          <div
            id="startio-banner-container"
            className="w-full min-h-[60px] flex items-center justify-center overflow-hidden"
          />
        )}

      </main>

      {/* Bottom Navigation */}
      <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-1 shadow-lg z-50">
        <div className="max-w-lg mx-auto px-2">
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            lang={lang}
          />
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        startIoConfig={startIoConfig}
        setStartIoConfig={setStartIoConfig}
      />
    </div>
  )
}

export default App
