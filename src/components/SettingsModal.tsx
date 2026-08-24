import React, { useState } from 'react';
import { X, ShieldCheck, Share2, Star, ExternalLink, Check } from 'lucide-react';
import { Language, ThemeMode, StartIoConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  startIoConfig: StartIoConfig;
  setStartIoConfig: React.Dispatch<React.SetStateAction<StartIoConfig>>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appShareUrl = 'https://play.google.com/store/apps/details?id=com.calculator.app';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'All In One Calculator',
          text: 'Check out this awesome All In One Calculator App!',
          url: appShareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(appShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Settings & Options
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          
          {/* Share App Button */}
          <button
            onClick={handleShare}
            className="w-full p-3.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/80 rounded-xl flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-lg group-hover:scale-105 transition">
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {copied ? 'Link Copied!' : 'Share App'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Share this app with your friends
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Share
            </span>
          </button>

          {/* Rate Us Option */}
          <a
            href={appShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/80 rounded-xl flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-lg group-hover:scale-105 transition">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  Rate Us
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Give us 5 stars on Play Store
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Rate
            </span>
          </a>

          {/* Privacy Policy */}
          <a
            href="https://docs.google.com/document/d/1WE176kjz7U1MgTzbevyo5TntbPuAQVeXIEj0CTkVqCA/edit?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-lg group-hover:scale-105 transition">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  Privacy Policy
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Read our data privacy policy
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
          </a>

        </div>

        {/* Footer Action */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer shadow-md shadow-emerald-600/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};                
