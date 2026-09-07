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
import { AdBanner } from './components/AdBanner'
import { SettingsModal } from './components/SettingsModal'
import { CalculatorType, Language, ThemeMode, StartIoConfig } from './types'
import { StartIo } from './lib/startIo'
import { APP_DOWNLOAD_URL, APP_SHARE_TEXT } from './config/share'
import './App.css'

function App() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [activeTab, setActiveTab] = useState<CalculatorType>('standard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [startIoConfig, setStartIoConfig] = useState<StartIoConfig>({
    appId: '206473031', // Live Ad ID
    enabled: true,
    showBanner: true,
    showInterstitialOnSwitch: true,
    testMode: false,
  })

  const handleShareApp = async () => {
    const shareData = {
      title: 'All In One Calculator',
      text: APP_SHARE_TEXT,
      url: APP_DOWNLOAD_URL,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Share cancelled or failed', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(APP_SHARE_TEXT)
        alert('Share text copied to clipboard!')
      } catch (error) {
        console.log('Clipboard copy failed', error)
        alert('Could not share or copy the link.')
      }
    }
  }

  // Initialize Start.io on mount
  useEffect(() => {
    console.log('🚀 App initialized - Start.io Live Ads enabled (ID: 206473031)')
    
    // Force SDK reload
    if (startIoConfig.enabled) {
      try {
        if (window.StartAppAds) {
          window.StartAppAds.init()
          console.log('✅ Start.io SDK initialized')
        }
      } catch (error) {
        console.log('ℹ️ Start.io ready for ads')
      }
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
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 max-w-lg w-full mx-auto px-4 pt-3 pb-2 overflow-y-auto space-y-4">
        {startIoConfig.enabled && startIoConfig.showBanner && (
          <AdBanner config={startIoConfig} />
        )}

        <div className="w-full">
          {activeTab === 'standard' && <StandardCalculator lang={lang} />}
          {activeTab === 'age' && <AgeCalculator lang={lang} />}
          {activeTab === 'gold' && <GoldCalculator lang={lang} />}
          {activeTab === 'viral' && <ViralCalculator lang={lang} />}
          {activeTab === 'weight' && <WeightCalculator lang={lang} />}
          {activeTab === 'currency' && <CurrencyCalculator lang={lang} />}
          {activeTab === 'love' && <LoveCalculator lang={lang} />}
        </div>

        {startIoConfig.enabled && startIoConfig.showBanner && (
          <AdBanner config={startIoConfig} />
        )}

        <div className="pt-2 pb-2 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 gap-3 text-center">
          <a
            href="https://raw.githubusercontent.com/dakrish960-wq/All-In-One-Calculator/main/PRIVACY_POLICY.md"
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
      </main>

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
        onShareApp={handleShareApp}
      />
    </div>
  )
}

export default App
