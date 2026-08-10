import React, { useState } from 'react';
import { Heart, Sparkles, Copy, Check, Flame, MessageCircle, ShieldCheck, Smile } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LoveCalculatorProps {
  lang: Language;
}

export const LoveCalculator: React.FC<LoveCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [yourName, setYourName] = useState<string>('Alex');
  const [partnerName, setPartnerName] = useState<string>('Emma');
  const [yourZodiac, setYourZodiac] = useState<string>('Aries');
  const [partnerZodiac, setPartnerZodiac] = useState<string>('Leo');
  const [copied, setCopied] = useState<boolean>(false);

  // Love calculation algorithm based on string character ASCII sum and hash determinism
  const calculateLoveScore = (name1: string, name2: string) => {
    const clean1 = name1.trim().toLowerCase();
    const clean2 = name2.trim().toLowerCase();
    if (!clean1 || !clean2) return 0;

    let sum = 0;
    const combined = clean1 + clean2;
    for (let i = 0; i < combined.length; i++) {
      sum += combined.charCodeAt(i);
    }

    // Deterministic percentage between 60% and 99%
    let score = (sum % 40) + 60;

    // Bonus if names share common letters (harmony factor)
    const set1 = new Set(clean1.split(''));
    const set2 = new Set(clean2.split(''));
    let common = 0;
    set1.forEach((char) => {
      if (set2.has(char)) common++;
    });
    score += common * 3;

    return Math.min(Math.max(score, 60), 100);
  };

  const loveScore = calculateLoveScore(yourName, partnerName);

  // Relationship Status Title
  const getLoveStatus = (score: number) => {
    if (score >= 90) return 'Soulmates Forever 💖 (চিরদিনের সঙ্গী)';
    if (score >= 80) return 'Deep Eternal Connection 💕 (গভীর সম্পর্ক)';
    if (score >= 70) return 'Passionate Chemistry 🔥 (দুর্দান্ত কেমিস্ট্রি)';
    return 'Sweet Romance 🌸 (মিষ্টি রোমান্স)';
  };

  const loveStatus = getLoveStatus(loveScore);

  // Breakdown sub-scores
  const commScore = Math.min(loveScore + 2, 99);
  const passionScore = Math.min(loveScore - 3, 98);
  const trustScore = Math.min(loveScore + 4, 100);
  const funScore = Math.min(loveScore - 1, 97);

  const loveQuotes = [
    '"Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."',
    '"You are my sun, my moon, and all my stars."',
    '"Where there is love there is life."',
    '"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."'
  ];

  const randomQuote = loveQuotes[loveScore % loveQuotes.length];

  const handleCopy = () => {
    const text = `${t.loveTitle}:\n${yourName} ❤️ ${partnerName}\n${t.loveScore}: ${loveScore}%\n${t.relationshipStatus}: ${loveStatus}\n${t.communicationScore}: ${commScore}%\n${t.passionScore}: ${passionScore}%\n${t.trustScore}: ${trustScore}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Heart className="w-8 h-8 text-rose-100 fill-rose-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.loveTitle}</h2>
            <p className="text-rose-100 text-xs sm:text-sm mt-0.5">{t.loveSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {t.yourName}
            </label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="e.g. Rahul"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {t.partnerName}
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="e.g. Ananya"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.yourZodiac}
              </label>
              <select
                value={yourZodiac}
                onChange={(e) => setYourZodiac(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium"
              >
                {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {t.partnerZodiac}
              </label>
              <select
                value={partnerZodiac}
                onChange={(e) => setPartnerZodiac(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium"
              >
                {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Love Match Display */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-slate-900 dark:to-rose-950/40 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-500" />
                Love Compatibility Card
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 text-xs font-semibold cursor-pointer hover:bg-rose-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyResult}
              </button>
            </div>

            {/* Big Heart Meter */}
            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 text-center space-y-2 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-rose-500">
                <span className="text-lg font-bold">{yourName || 'Partner 1'}</span>
                <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
                <span className="text-lg font-bold">{partnerName || 'Partner 2'}</span>
              </div>

              <div className="text-5xl sm:text-6xl font-black text-rose-600 dark:text-rose-400 my-2">
                {loveScore}%
              </div>

              <div className="pt-1">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-900">
                  {loveStatus}
                </span>
              </div>
            </div>

            {/* Breakdown Scores */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-rose-100 dark:border-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                  {t.communicationScore}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{commScore}%</span>
              </div>

              <div className="p-3 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-rose-100 dark:border-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  {t.passionScore}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{passionScore}%</span>
              </div>

              <div className="p-3 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-rose-100 dark:border-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  {t.trustScore}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{trustScore}%</span>
              </div>

              <div className="p-3 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-rose-100 dark:border-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Smile className="w-3.5 h-3.5 text-amber-500" />
                  {t.funScore}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{funScore}%</span>
              </div>
            </div>

            {/* Love Quote */}
            <div className="p-3.5 bg-rose-500/10 rounded-2xl border border-rose-200 dark:border-rose-900/40 text-center text-xs italic text-rose-900 dark:text-rose-200">
              {randomQuote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
