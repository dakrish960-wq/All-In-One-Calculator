import React, { useState } from 'react';
import { Coins, Copy, Check, Info, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface GoldCalculatorProps {
  lang: Language;
}

export const GoldCalculator: React.FC<GoldCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [weight, setWeight] = useState<number>(1);
  const [unit, setUnit] = useState<'bhori' | 'gram' | 'ana' | 'ratti' | 'ounce'>('bhori');
  const [karat, setKarat] = useState<number>(22);
  const [pricePerUnit, setPricePerUnit] = useState<number>(140000); // BDT per bhori default
  const [makingCharge, setMakingCharge] = useState<number>(5); // 5% default
  const [makingType, setMakingType] = useState<'percent' | 'fixed'>('percent');
  const [vat, setVat] = useState<number>(5); // 5% VAT default
  const [copied, setCopied] = useState<boolean>(false);

  // Conversion rates relative to 1 Bhori (11.664 grams)
  const BHORI_IN_GRAMS = 11.664;
  const ANA_PER_BHORI = 16;
  const RATTI_PER_BHORI = 96;
  const OUNCE_IN_GRAMS = 31.1035;

  // Convert given weight into grams first
  const getWeightInGrams = () => {
    switch (unit) {
      case 'bhori':
        return weight * BHORI_IN_GRAMS;
      case 'gram':
        return weight;
      case 'ana':
        return (weight / ANA_PER_BHORI) * BHORI_IN_GRAMS;
      case 'ratti':
        return (weight / RATTI_PER_BHORI) * BHORI_IN_GRAMS;
      case 'ounce':
        return weight * OUNCE_IN_GRAMS;
      default:
        return weight;
    }
  };

  // Convert price per selected unit into price per gram
  const getPricePerGram = () => {
    switch (unit) {
      case 'bhori':
        return pricePerUnit / BHORI_IN_GRAMS;
      case 'gram':
        return pricePerUnit;
      case 'ana':
        return (pricePerUnit * ANA_PER_BHORI) / BHORI_IN_GRAMS;
      case 'ratti':
        return (pricePerUnit * RATTI_PER_BHORI) / BHORI_IN_GRAMS;
      case 'ounce':
        return pricePerUnit / OUNCE_IN_GRAMS;
      default:
        return pricePerUnit;
    }
  };

  const weightInGrams = getWeightInGrams();
  const pricePerGram = getPricePerGram();

  // Karat purity factor relative to 24K
  const karatPurity = karat / 24;

  // Base raw gold price
  const baseGoldPrice = weightInGrams * pricePerGram * karatPurity;

  // Making charge calculation
  const totalMakingCharge =
    makingType === 'percent' ? (baseGoldPrice * makingCharge) / 100 : makingCharge;

  // VAT calculation
  const totalTaxAmount = ((baseGoldPrice + totalMakingCharge) * vat) / 100;

  // Total final price
  const totalGoldPrice = baseGoldPrice + totalMakingCharge + totalTaxAmount;

  // Presets
  const applyPreset = (presetType: 'bajus22' | 'bajus21' | 'int24') => {
    if (presetType === 'bajus22') {
      setUnit('bhori');
      setKarat(22);
      setPricePerUnit(140000);
      setMakingCharge(5);
      setMakingType('percent');
      setVat(5);
    } else if (presetType === 'bajus21') {
      setUnit('bhori');
      setKarat(21);
      setPricePerUnit(133500);
      setMakingCharge(5);
      setMakingType('percent');
      setVat(5);
    } else if (presetType === 'int24') {
      setUnit('gram');
      setKarat(24);
      setPricePerUnit(85); // ~$85/gram
      setMakingCharge(3);
      setMakingType('percent');
      setVat(0);
    }
  };

  const handleCopy = () => {
    const text = `${t.goldTitle}:\n${t.goldWeight}: ${weight} ${unit}\n${t.karatLabel}: ${karat}K\n${t.baseGoldValue}: ${baseGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n${t.totalMakingCharge}: ${totalMakingCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n${t.totalTaxAmount}: ${totalTaxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n${t.totalGoldPrice}: ${totalGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Coins className="w-8 h-8 text-amber-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.goldTitle}</h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-0.5">{t.goldSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Quick Rate Presets */}
      <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
          <Info className="w-4 h-4" />
          {t.presetPrices}:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('bajus22')}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-sm border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition cursor-pointer"
          >
            {t.bajus22k} (1,40,000 ৳/ভরি)
          </button>
          <button
            onClick={() => applyPreset('bajus21')}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-sm border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition cursor-pointer"
          >
            {t.bajus21k} (1,33,500 ৳/ভরি)
          </button>
          <button
            onClick={() => applyPreset('int24')}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-sm border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition cursor-pointer"
          >
            {t.int24k} ($85/Gram)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.goldWeight}
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.unitLabel}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="bhori">{t.unitBhori}</option>
                <option value="gram">{t.unitGram}</option>
                <option value="ana">{t.unitAna}</option>
                <option value="ratti">{t.unitRatti}</option>
                <option value="ounce">{t.unitOunce}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.karatLabel}
              </label>
              <select
                value={karat}
                onChange={(e) => setKarat(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={24}>24 Karat (99.9% Pure)</option>
                <option value={22}>22 Karat (91.6% Pure)</option>
                <option value={21}>21 Karat (87.5% Pure)</option>
                <option value={18}>18 Karat (75.0% Pure)</option>
                <option value={14}>14 Karat (58.3% Pure)</option>
                <option value={10}>10 Karat (41.7% Pure)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.pricePerUnit} ({unit})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.makingCharge} ({makingType === 'percent' ? '%' : 'Fixed'})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={makingCharge}
                onChange={(e) => setMakingCharge(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.makingChargeType}
              </label>
              <select
                value={makingType}
                onChange={(e) => setMakingType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="percent">{t.percentage}</option>
                <option value="fixed">{t.fixedAmount}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {t.taxVat}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={vat}
              onChange={(e) => setVat(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/50 dark:from-slate-900 dark:to-amber-950/40 p-6 rounded-3xl border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                Price Breakdown Summary
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200 text-xs font-semibold cursor-pointer hover:bg-amber-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyResult}
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-sm py-1.5 border-b border-amber-200/60 dark:border-amber-900/40">
                <span className="text-slate-600 dark:text-slate-400">{t.baseGoldValue}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {baseGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-1.5 border-b border-amber-200/60 dark:border-amber-900/40">
                <span className="text-slate-600 dark:text-slate-400">
                  {t.totalMakingCharge} ({makingCharge}{makingType === 'percent' ? '%' : ''})
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  + {totalMakingCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-1.5 border-b border-amber-200/60 dark:border-amber-900/40">
                <span className="text-slate-600 dark:text-slate-400">
                  {t.totalTaxAmount} ({vat}%)
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  + {totalTaxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Total Price Block */}
              <div className="pt-3 bg-white dark:bg-slate-800 p-4 rounded-2xl text-center border border-amber-200 dark:border-amber-800/80 shadow-md">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                  {t.totalGoldPrice}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
                  {totalGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                  Weight in Grams: {weightInGrams.toFixed(3)}g | Purity: {(karatPurity * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
