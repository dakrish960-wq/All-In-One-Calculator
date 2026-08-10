import React, { useState } from 'react';
import { X, Code, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import { Language } from '../types';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const englishPrompt = `### Master Prompt for All In One Calculator (com.calculator.app)

**App Title:** All In One Calculator
**Package Name:** com.calculator.app
**Target Platform:** Android (Google Play Store) & Web SPA
**Monetization Network:** Start.io SDK Integration (Banner & Interstitial Ads)
**Key Architecture:** 100% Offline-First execution, ultra-fast performance, zero external API latency dependencies, offline currency rates fallback engine.

---

### Core Calculators Scope & Features:

1. **Age Calculator (এজ ক্যালকুলেটর):**
   - Calculates exact age in Years, Months, Days, Hours, Minutes, and Seconds.
   - Live countdown timer to the user's next birthday.
   - Automatic Western & Chinese Zodiac sign detection.
   - Age Comparison feature comparing two people's birth dates with exact difference breakdowns.

2. **Gold Price Calculator (গোল্ড ক্যালকুলেটর):**
   - Multi-unit support: Bhori/Vori (11.664g), Grams, Ana (1/16 Bhori), Ratti (1/96 Bhori), and Ounces.
   - Purity Karat support: 24K (99.9%), 22K (91.6%), 21K (87.5%), 18K (75.0%), 14K, 10K.
   - Quick rate presets for BAJUS (Bangladesh) 22K/21K and International Spot Gold.
   - Complete purchase price breakdown: Raw Gold Price + Making Charge (% or Fixed) + Govt VAT/Tax (%).

3. **Viral Social Media Calculator (ভাইরাল ক্যালকুলেটর):**
   - Multi-platform support: TikTok, Instagram Reels, YouTube Shorts, Facebook Video.
   - Calculates Engagement Rate (%), Viral Score (0-100), and Algorithm Reach Push probability.
   - Provides estimated Monetization/Earnings Range (CPM based).
   - Generates actionable growth recommendations to optimize video hooks and completion rates.

4. **Weight & BMI Calculator (ওয়েট ও বিএমআই ক্যালকুলেটর):**
   - Inputs: Height (cm or ft/inches), Weight (kg or lbs), Age, Gender, and Activity Level.
   - Color-coded BMI score classification (Underweight, Normal, Overweight, Obese).
   - Calculates Ideal Body Weight Range and target weight loss/gain needed.
   - BMR (Basal Metabolic Rate) & TDEE (Total Daily Energy Expenditure) calorie recommendations.
   - Recommended Daily Water Intake (Liters & Glasses).

5. **Currency Calculator & Converter (কারেন্সি ক্যালকুলেটর):**
   - Offline multi-currency converter supporting BDT, USD, EUR, GBP, INR, SAR, AED, MYR, CAD, AUD, SGD, JPY, QAR, KWD, OMR.
   - Built-in exchange rate matrix with optional live online rate update.
   - Multi-currency quick conversion table.

6. **Love Compatibility Calculator (লাভ ক্যালকুলেটর):**
   - Calculates love match percentage (%) based on name numerology and zodiac synergy.
   - Displays relationship status badges, communication, passion, trust, and fun breakdown scores.
   - Custom shareable love certificate card.

7. **Standard & Scientific Calculator (স্ট্যান্ডার্ড ক্যালকুলেটর):**
   - Full standard math operations (+, -, ×, ÷, %, AC, C, ±).
   - Scientific operations (sin, cos, tan, log, ln, √, x², π, rad/deg toggle).
   - Calculation Tape History log with one-click result recall.

---

### Google Play Store Policy Compliance:
- Fully compliant with Google Play Content & Data Safety Policies.
- Embedded Privacy Policy & Terms of Service text.
- Package ID \`com.calculator.app\` verified.
- Non-intrusive Start.io Ad banner integration.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(englishPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-950/40">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              English Play Store Prompt & Specs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Copy this prompt for Play Store listing / AI generation:
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy English Prompt'}
            </button>
          </div>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 max-h-[420px] overflow-y-auto select-all">
            <pre className="whitespace-pre-wrap">{englishPrompt}</pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-white font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
