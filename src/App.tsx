import React, { useState } from 'react'
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
import { AdBanner } from './components/AdBanner'
import { CalculatorType, Language, ThemeMode, StartIoConfig } from './types'
import './App.css'

function App() {
  const [lang, setLang] = useState<Language>('bn')
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [activeTab, setActiveTab] = useState<CalculatorType>('standard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [startIoConfig, setStartIoConfig] = useState<StartIoConfig>({
    appId: '206473031',
    enabled: true,
    showBanner: true,
    showInterstitialOnSwitch: true,
    testMode: false,
  })

  return (
    <div className={theme === 'dark' ? 'dark bg-slate-950 text-slate-100 min-h-screen flex flex-col' : 'bg-slate-100 text-slate-900 min-h-screen flex flex-col'}>
      <Header 
        lang={lang} 
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 max-w-2xl w-full mx-auto px-3 sm:px-4 pt-3 pb-32 overflow-y-auto space-y-4">
        <div className="w-full">
          {activeTab === 'standard' && <StandardCalculator lang={lang} />}
          {activeTab === 'age' && <AgeCalculator lang={lang} />}
          {activeTab === 'gold' && <GoldCalculator lang={lang} />}
          {activeTab === 'viral' && <ViralCalculator lang={lang} />}
          {activeTab === 'weight' && <WeightCalculator lang={lang} />}
          {activeTab === 'currency' && <CurrencyCalculator lang={lang} />}
          {activeTab === 'love' && <LoveCalculator lang={lang} />}
        </div>

        {/* Start.io Ad Banner Component */}
        <AdBanner config={startIoConfig} lang={lang} />

        <footer className="mt-6 mb-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-xs text-slate-500 dark:text-slate-400 gap-1.5 text-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">com.calculator.app</span>
            <span>•</span>
            <span>100% Offline Calculator</span>
          </div>
          <div className="flex items-center gap-3">
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
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 shadow-lg">
        <div className="max-w-2xl mx-auto">
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
