import React, { useState } from 'react';
import { Scale, HeartPulse, Activity, Droplets, Copy, Check, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WeightCalculatorProps {
  lang: Language;
}

export const WeightCalculator: React.FC<WeightCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Metric defaults
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial defaults
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const [age, setAge] = useState<number>(25);
  const [activity, setActivity] = useState<number>(1.375); // Lightly active
  const [copied, setCopied] = useState<boolean>(false);

  // Standardize inputs to kg and cm
  const activeHeightCm = unitSystem === 'metric' 
    ? heightCm 
    : (heightFeet * 30.48) + (heightInches * 2.54);

  const activeWeightKg = unitSystem === 'metric' 
    ? weightKg 
    : weightLbs * 0.453592;

  // BMI Calculation
  const heightM = activeHeightCm / 100;
  const bmi = heightM > 0 ? activeWeightKg / (heightM * heightM) : 0;

  // BMI Category & Color
  const getBmiCategory = (score: number) => {
    if (score < 18.5) return { category: 'Underweight (ওজন কম)', color: 'text-amber-500 bg-amber-500/10 border-amber-300' };
    if (score <= 24.9) return { category: 'Normal Weight (সঠিক ওজন)', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-300' };
    if (score <= 29.9) return { category: 'Overweight (অতিরিক্ত ওজন)', color: 'text-orange-500 bg-orange-500/10 border-orange-300' };
    return { category: 'Obese (স্থূলতা)', color: 'text-rose-500 bg-rose-500/10 border-rose-300' };
  };

  const bmiInfo = getBmiCategory(bmi);

  // Ideal Weight Range (Healthy BMI 18.5 - 24.9)
  const minIdealKg = 18.5 * (heightM * heightM);
  const maxIdealKg = 24.9 * (heightM * heightM);
  const targetIdealKg = 21.7 * (heightM * heightM);

  const weightDiffKg = activeWeightKg - targetIdealKg;

  // BMR Calculation (Mifflin-St Jeor)
  const bmr = gender === 'male'
    ? (10 * activeWeightKg) + (6.25 * activeHeightCm) - (5 * age) + 5
    : (10 * activeWeightKg) + (6.25 * activeHeightCm) - (5 * age) - 161;

  // TDEE
  const tdee = Math.round(bmr * activity);

  // Daily Water Intake (35ml per kg)
  const waterLiters = (activeWeightKg * 0.035).toFixed(1);
  const waterGlasses = Math.round(parseFloat(waterLiters) * 4); // 250ml glasses

  const handleCopy = () => {
    const text = `${t.weightTitle}:\nBMI: ${bmi.toFixed(1)} (${bmiInfo.category})\nHeight: ${activeHeightCm.toFixed(0)}cm, Weight: ${activeWeightKg.toFixed(1)}kg\nIdeal Weight Range: ${minIdealKg.toFixed(1)}kg - ${maxIdealKg.toFixed(1)}kg\nBMR: ${Math.round(bmr)} kcal, TDEE: ${tdee} kcal\nWater Intake: ${waterLiters} Liters/day`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Scale className="w-8 h-8 text-teal-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.weightTitle}</h2>
            <p className="text-teal-100 text-xs sm:text-sm mt-0.5">{t.weightSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.gender}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    gender === 'male'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    gender === 'female'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t.female}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Unit System
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    unitSystem === 'metric'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    unitSystem === 'imperial'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>
          </div>

          {/* Height Input */}
          {unitSystem === 'metric' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.height} ({t.cm})
              </label>
              <input
                type="number"
                min="50"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Feet (ft)
                </label>
                <input
                  type="number"
                  min="2"
                  max="8"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Inches (in)
                </label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={heightInches}
                  onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>
          )}

          {/* Weight Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              {t.weight} ({unitSystem === 'metric' ? t.kg : t.lbs})
            </label>
            <input
              type="number"
              min="10"
              max="300"
              value={unitSystem === 'metric' ? weightKg : weightLbs}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (unitSystem === 'metric') setWeightKg(val);
                else setWeightLbs(val);
              }}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.activityLevel}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-xs"
              >
                <option value={1.2}>{t.sedentary}</option>
                <option value={1.375}>{t.lightlyActive}</option>
                <option value={1.55}>{t.moderatelyActive}</option>
                <option value={1.725}>{t.veryActive}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 dark:from-slate-900 dark:to-teal-950/40 p-6 rounded-3xl border border-teal-100 dark:border-teal-900/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-500" />
                Health Metrics
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200 text-xs font-semibold cursor-pointer hover:bg-teal-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyResult}
              </button>
            </div>

            {/* BMI Score Display */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-teal-100 dark:border-slate-700 text-center space-y-2 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                {t.bmiResult}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-teal-600 dark:text-teal-400">
                {bmi.toFixed(1)}
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${bmiInfo.color}`}>
                  {bmiInfo.category}
                </span>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-teal-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.idealWeightRange}
                </span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                  {minIdealKg.toFixed(1)} - {maxIdealKg.toFixed(1)} kg
                </span>
              </div>

              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-teal-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.targetWeightChange}
                </span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                  {weightDiffKg > 0 ? `Lose ${weightDiffKg.toFixed(1)} kg` : weightDiffKg < 0 ? `Gain ${Math.abs(weightDiffKg).toFixed(1)} kg` : 'At Target!'}
                </span>
              </div>
            </div>

            {/* Calories & Water */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-teal-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.tdee}
                </span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {tdee} kcal / day
                </span>
              </div>

              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-teal-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                    {t.waterIntake}
                  </span>
                  <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5 block">
                    {waterLiters} L ({waterGlasses} glasses)
                  </span>
                </div>
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
