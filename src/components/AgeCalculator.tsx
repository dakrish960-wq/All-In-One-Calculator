import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Users, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AgeCalculatorProps {
  lang: Language;
}

export const AgeCalculator: React.FC<AgeCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  // Compare mode
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [person1Dob, setPerson1Dob] = useState<string>('1998-05-15');
  const [person2Dob, setPerson2Dob] = useState<string>('2001-11-20');

  const [copied, setCopied] = useState<boolean>(false);

  // Helper functions for age calculation
  const getExactAge = (birthDateStr: string, atDateStr: string) => {
    const birth = new Date(birthDateStr);
    const at = new Date(atDateStr);

    if (isNaN(birth.getTime()) || isNaN(at.getTime()) || birth > at) {
      return null;
    }

    let years = at.getFullYear() - birth.getFullYear();
    let months = at.getMonth() - birth.getMonth();
    let days = at.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(at.getFullYear(), at.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(at.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next Birthday calculation
    const nextBday = new Date(at.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < at) {
      nextBday.setFullYear(at.getFullYear() + 1);
    }
    const nextBdayDiff = nextBday.getTime() - at.getTime();
    const nextBdayDaysTotal = Math.ceil(nextBdayDiff / (1000 * 60 * 60 * 24));
    const nextBdayMonths = Math.floor(nextBdayDaysTotal / 30.4375);
    const nextBdayDays = Math.floor(nextBdayDaysTotal % 30.4375);
    const dayOfWeek = nextBday.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long' });

    // Zodiac sign calculation
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    let zodiac = 'Capricorn';
    let zodiacBn = 'মকর';

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) { zodiac = 'Aries ♈'; zodiacBn = 'মেষ ♈'; }
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) { zodiac = 'Taurus ♉'; zodiacBn = 'বৃষ ♉'; }
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) { zodiac = 'Gemini ♊'; zodiacBn = 'মিথুন ♊'; }
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) { zodiac = 'Cancer ♋'; zodiacBn = 'কর্কট ♋'; }
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) { zodiac = 'Leo ♌'; zodiacBn = 'সিংহ ♌'; }
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) { zodiac = 'Virgo ♍'; zodiacBn = 'কন্যা ♍'; }
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) { zodiac = 'Libra ♎'; zodiacBn = 'তুলা ♎'; }
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) { zodiac = 'Scorpio ♏'; zodiacBn = 'বৃশ্চিক ♏'; }
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) { zodiac = 'Sagittarius ♐'; zodiacBn = 'ধনু ♐'; }
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) { zodiac = 'Capricorn ♑'; zodiacBn = 'মকর ♑'; }
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) { zodiac = 'Aquarius ♒'; zodiacBn = 'কুম্ভ ♒'; }
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) { zodiac = 'Pisces ♓'; zodiacBn = 'মীন ♓'; }

    const dayBornOn = birth.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long' });

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBdayMonths,
      nextBdayDays,
      nextBdayTotalDays: nextBdayDaysTotal,
      nextBdayDayOfWeek: dayOfWeek,
      zodiac: lang === 'bn' ? zodiacBn : zodiac,
      dayBornOn,
    };
  };

  const ageData = getExactAge(dob, targetDate);

  // Age difference helper
  const getAgeDiff = () => {
    const d1 = new Date(person1Dob);
    const d2 = new Date(person2Dob);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const diffMs = Math.abs(d1.getTime() - d2.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const remainingDays = Math.floor(totalDays % 365.25);
    const months = Math.floor(remainingDays / 30.4375);
    const days = Math.floor(remainingDays % 30.4375);
    const older = d1 < d2 ? 'Person 1' : 'Person 2';
    return { years, months, days, totalDays, older };
  };

  const ageDiffData = getAgeDiff();

  const handleCopy = () => {
    if (!ageData) return;
    const text = `${t.ageTitle}:\n${t.years}: ${ageData.years}, ${t.months}: ${ageData.months}, ${t.days}: ${ageData.days}\n${t.totalDays}: ${ageData.totalDays.toLocaleString()}\n${t.nextBirthday}: ${ageData.nextBdayMonths}m ${ageData.nextBdayDays}d\n${t.zodiacSign}: ${ageData.zodiac}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Calendar className="w-8 h-8 text-indigo-200" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.ageTitle}</h2>
            <p className="text-indigo-100 text-xs sm:text-sm mt-0.5">{t.ageSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Calculation Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {t.dobLabel}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {t.targetDateLabel}
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setShowCompare(!showCompare)}
              className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <Users className="w-4 h-4" />
              {showCompare ? 'Hide Age Compare' : t.compareAgeTitle}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t.copied : t.copyResult}
            </button>
          </div>
        </div>

        {/* Primary Results Display */}
        <div className="lg:col-span-7 space-y-6">
          {ageData ? (
            <>
              {/* Big Age Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950/40 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Exact Age Calculation
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-indigo-100/80 dark:border-slate-700 shadow-sm">
                    <span className="block text-2xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {ageData.years}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.years}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-indigo-100/80 dark:border-slate-700 shadow-sm">
                    <span className="block text-2xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {ageData.months}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.months}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-indigo-100/80 dark:border-slate-700 shadow-sm">
                    <span className="block text-2xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {ageData.days}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.days}</span>
                  </div>
                </div>

                {/* Additional Highlights */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-100 dark:border-indigo-900/40">
                  <div className="bg-white/60 dark:bg-slate-800/40 p-3 rounded-xl">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t.nextBirthday}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {ageData.nextBdayTotalDays} Days ({ageData.nextBdayMonths}m {ageData.nextBdayDays}d)
                    </span>
                  </div>

                  <div className="bg-white/60 dark:bg-slate-800/40 p-3 rounded-xl">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t.zodiacSign}</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">{ageData.zodiac}</span>
                  </div>

                  <div className="bg-white/60 dark:bg-slate-800/40 p-3 rounded-xl">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t.dayOfWeekBorn}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{ageData.dayBornOn}</span>
                  </div>
                </div>
              </div>

              {/* Lifetime Stats */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  {t.totalLived}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.totalDays}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {ageData.totalDays.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.totalWeeks}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {ageData.totalWeeks.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.totalHours}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {ageData.totalHours.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.minutes}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {ageData.totalMinutes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Please enter a valid Date of Birth. Target date must be after Date of Birth.
            </div>
          )}
        </div>
      </div>

      {/* Compare Age Drawer / Section */}
      {showCompare && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
            {t.compareAgeTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t.person1}
              </label>
              <input
                type="date"
                value={person1Dob}
                onChange={(e) => setPerson1Dob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {t.person2}
              </label>
              <input
                type="date"
                value={person2Dob}
                onChange={(e) => setPerson2Dob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          {ageDiffData && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl text-center border border-indigo-200 dark:border-indigo-800">
              <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold block uppercase tracking-wider">
                {t.ageDifference}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-900 dark:text-white mt-1 block">
                {ageDiffData.years} {t.years}, {ageDiffData.months} {t.months}, {ageDiffData.days} {t.days}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                ({ageDiffData.totalDays.toLocaleString()} Total Days)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
