import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowRightLeft, RefreshCw, WifiOff, Copy, Check, Globe } from 'lucide-react';
import { Language, CurrencyRate } from '../types';
import { INITIAL_CURRENCIES } from '../data/currencies';
import { translations } from '../data/translations';

interface CurrencyCalculatorProps {
  lang: Language;
}

export const CurrencyCalculator: React.FC<CurrencyCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [currencies, setCurrencies] = useState<CurrencyRate[]>(() => {
    const saved = localStorage.getItem('calculator_currencies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CURRENCIES;
      }
    }
    return INITIAL_CURRENCIES;
  });

  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('BDT');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fromCurr = currencies.find((c) => c.code === fromCode) || currencies[1]; // USD
  const toCurr = currencies.find((c) => c.code === toCode) || currencies[0]; // BDT

  // Convert amount from `fromCode` to `toCode` via USD base rate
  // amountInUSD = amount / fromRateToUSD
  // resultInToCurrency = amountInUSD * toRateToUSD
  const amountInUSD = amount / (fromCurr.rateToUSD || 1);
  const convertedAmount = amountInUSD * (toCurr.rateToUSD || 1);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  // Attempt live exchange rate update if online
  const fetchLiveRates = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data && data.rates) {
        const updated = currencies.map((curr) => {
          if (data.rates[curr.code]) {
            return { ...curr, rateToUSD: data.rates[curr.code] };
          }
          return curr;
        });
        setCurrencies(updated);
        localStorage.setItem('calculator_currencies', JSON.stringify(updated));
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      // Offline fallback silently keeps cached rates!
      setLastUpdated('Cached Rates (Offline)');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopy = () => {
    const text = `${t.currencyTitle}:\n${amount} ${fromCurr.code} = ${convertedAmount.toFixed(2)} ${toCurr.code}\n1 ${fromCurr.code} = ${(toCurr.rateToUSD / fromCurr.rateToUSD).toFixed(4)} ${toCurr.code}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <DollarSign className="w-8 h-8 text-blue-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.currencyTitle}</h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5">{t.currencySubtitle}</p>
          </div>
        </div>
      </div>

      {/* Offline Status Bar */}
      <div className="bg-blue-50/70 dark:bg-blue-950/30 p-3.5 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between gap-2 text-xs">
        <span className="text-blue-900 dark:text-blue-300 font-medium flex items-center gap-1.5">
          <WifiOff className="w-4 h-4 text-blue-500" />
          {t.offlineNotice} {lastUpdated && `(${lastUpdated})`}
        </span>

        <button
          onClick={fetchLiveRates}
          disabled={isUpdating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
          {t.updateRates}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Converter Form */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {t.amount}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.fromCurrency}
              </label>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {lang === 'bn' ? c.nameBn : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center pt-5">
              <button
                onClick={handleSwap}
                className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition shadow-sm cursor-pointer"
                title={t.swapCurrencies}
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.toCurrency}
              </label>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {lang === 'bn' ? c.nameBn : c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Converted Output Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                {t.convertedResult}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-xs font-semibold cursor-pointer hover:bg-blue-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyResult}
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-blue-100 dark:border-slate-700 text-center space-y-2 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {amount} {fromCurr.flag} {fromCurr.code} =
              </div>
              <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                {toCurr.symbol} {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurr.code}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                1 {fromCurr.code} = {(toCurr.rateToUSD / fromCurr.rateToUSD).toFixed(4)} {toCurr.code}
              </div>
            </div>

            {/* Quick Multi-Currency Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {t.conversionRatesTable} ({amount} {fromCurr.code}):
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currencies
                  .filter((c) => c.code !== fromCode)
                  .slice(0, 6)
                  .map((c) => {
                    const val = (amount / fromCurr.rateToUSD) * c.rateToUSD;
                    return (
                      <div
                        key={c.code}
                        className="p-2.5 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-blue-100 dark:border-slate-700 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {c.flag} {c.code}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {c.symbol}{val.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
