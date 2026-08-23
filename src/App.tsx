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
import { CalculatorType, Language, ThemeMode, StartIoConfig } from './types'
import './App.css'

function App() {
  const [lang, setLang] = useState<Language>('en')
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
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Header 
        lang={lang} 
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <Navigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
        />

        <div className="mt-8">
          {activeTab === 'standard' && <StandardCalculator lang={lang} />}
          {activeTab === 'age' && <AgeCalculator lang={lang} />}
          {activeTab === 'gold' && <GoldCalculator lang={lang} />}
          {activeTab === 'viral' && <ViralCalculator lang={lang} />}
          {activeTab === 'weight' && <WeightCalculator lang={lang} />}
          {activeTab === 'currency' && <CurrencyCalculator lang={lang} />}
          {activeTab === 'love' && <LoveCalculator lang={lang} />}
        </div>
      </main>

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
