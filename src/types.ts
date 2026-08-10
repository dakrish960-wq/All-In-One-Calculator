export type CalculatorType = 
  | 'age'
  | 'gold'
  | 'viral'
  | 'weight'
  | 'currency'
  | 'love'
  | 'standard';

export type Language = 'bn' | 'en';

export type ThemeMode = 'dark' | 'light' | 'system';

export type AccentColor = 'emerald' | 'indigo' | 'rose' | 'amber' | 'violet';

export interface CurrencyRate {
  code: string;
  name: string;
  nameBn: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // USD base
}

export interface HistoryItem {
  id: string;
  type: CalculatorType;
  title: string;
  details: string;
  result: string;
  timestamp: number;
}

export interface StartIoConfig {
  appId: string;
  enabled: boolean;
  showBanner: boolean;
  showInterstitialOnSwitch: boolean;
  testMode: boolean;
}
