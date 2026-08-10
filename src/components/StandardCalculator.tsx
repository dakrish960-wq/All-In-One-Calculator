import React, { useState } from 'react';
import { Calculator, Delete, History, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface StandardCalculatorProps {
  lang: Language;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [degMode, setDegMode] = useState<boolean>(true); // Degrees vs Radians

  const handleNum = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    if (display === 'Error') return;
    setEquation(`${display} ${op} `);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEqual = () => {
    try {
      let expr = equation + display;
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      // Safe JS evaluation for mathematical expression
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formatted = Number(result.toFixed(8)).toString();
        const historyItem = `${expr} = ${formatted}`;
        setHistory([historyItem, ...history.slice(0, 19)]);
        setDisplay(formatted);
        setEquation('');
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleSciFunc = (func: string) => {
    try {
      const num = parseFloat(display);
      if (isNaN(num)) return;
      let res = 0;
      const angleMultiplier = degMode ? Math.PI / 180 : 1;

      switch (func) {
        case 'sin':
          res = Math.sin(num * angleMultiplier);
          break;
        case 'cos':
          res = Math.cos(num * angleMultiplier);
          break;
        case 'tan':
          res = Math.tan(num * angleMultiplier);
          break;
        case 'sqrt':
          res = Math.sqrt(num);
          break;
        case 'sqr':
          res = Math.pow(num, 2);
          break;
        case 'log':
          res = Math.log10(num);
          break;
        case 'ln':
          res = Math.log(num);
          break;
        case 'pi':
          res = Math.PI;
          break;
        case 'pct':
          res = num / 100;
          break;
        default:
          return;
      }

      const formatted = Number(res.toFixed(8)).toString();
      setHistory([`${func}(${num}) = ${formatted}`, ...history.slice(0, 19)]);
      setDisplay(formatted);
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-emerald-900 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Calculator className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.standardTitle}</h2>
            <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">{t.standardSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Calculator Keypad */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
            >
              {isScientific ? 'Standard Mode' : 'Scientific Mode'}
            </button>

            {isScientific && (
              <button
                onClick={() => setDegMode(!degMode)}
                className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition cursor-pointer"
              >
                {degMode ? 'DEG' : 'RAD'}
              </button>
            )}
          </div>

          {/* Calculator Screen */}
          <div className="bg-slate-900 text-right p-5 rounded-2xl border border-slate-800 shadow-inner min-h-[90px] flex flex-col justify-end">
            <span className="text-xs text-slate-400 font-mono h-4 block">
              {equation}
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-wider overflow-x-auto">
              {display}
            </span>
          </div>

          {/* Scientific Row */}
          {isScientific && (
            <div className="grid grid-cols-5 gap-2">
              {['sin', 'cos', 'tan', 'sqrt', 'sqr', 'log', 'ln', 'pi', 'pct'].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleSciFunc(fn)}
                  className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs transition cursor-pointer"
                >
                  {fn}
                </button>
              ))}
            </div>
          )}

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={handleClear}
              className="py-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 font-bold text-base transition cursor-pointer"
            >
              AC
            </button>
            <button
              onClick={handleDelete}
              className="py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-base transition flex items-center justify-center cursor-pointer"
            >
              <Delete className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSciFunc('pct')}
              className="py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-base transition cursor-pointer"
            >
              %
            </button>
            <button
              onClick={() => handleOp('÷')}
              className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-md hover:bg-emerald-700 transition cursor-pointer"
            >
              ÷
            </button>

            {['7', '8', '9'].map((n) => (
              <button
                key={n}
                onClick={() => handleNum(n)}
                className="py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('×')}
              className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-md hover:bg-emerald-700 transition cursor-pointer"
            >
              ×
            </button>

            {['4', '5', '6'].map((n) => (
              <button
                key={n}
                onClick={() => handleNum(n)}
                className="py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('−')}
              className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-md hover:bg-emerald-700 transition cursor-pointer"
            >
              −
            </button>

            {['1', '2', '3'].map((n) => (
              <button
                key={n}
                onClick={() => handleNum(n)}
                className="py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('+')}
              className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-md hover:bg-emerald-700 transition cursor-pointer"
            >
              +
            </button>

            <button
              onClick={() => handleNum('0')}
              className="col-span-2 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              0
            </button>
            <button
              onClick={() => handleNum('.')}
              className="py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              .
            </button>
            <button
              onClick={handleEqual}
              className="py-3.5 rounded-2xl bg-emerald-500 text-white font-black text-xl shadow-lg hover:bg-emerald-600 transition cursor-pointer"
            >
              =
            </button>
          </div>
        </div>

        {/* Tape History Log */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-emerald-500" />
              {t.historyLog}
            </span>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
              >
                {t.clearHistory}
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {history.length > 0 ? (
              history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const parts = item.split('=');
                    if (parts[1]) setDisplay(parts[1].trim());
                  }}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-right font-mono text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 transition"
                >
                  <span className="text-slate-900 dark:text-white font-bold block">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">
                {t.noHistory}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
