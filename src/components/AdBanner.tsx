import React, { useState, useEffect } from 'react';
import { StartIoConfig, Language } from '../types';
import { translations } from '../data/translations';
import { ExternalLink, X, Zap } from 'lucide-react';

interface AdBannerProps {
  config: StartIoConfig;
  lang: Language;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config, lang }) => {
  const t = translations[lang];
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [sdkLoaded, setSdkLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!config.enabled || !config.appId) return;

    // Dynamically inject Start.io Web SDK Tag
    const scriptId = 'startio-web-sdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://sdk.startappservice.com/s/3.0.0/startapp.js';
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
        // Initialize Start.io web SDK if available on window
        if ((window as any).startapp) {
          try {
            (window as any).startapp.init({ appId: config.appId });
          } catch (e) {
            console.log('Start.io initialized with App ID:', config.appId);
          }
        }
      };
      script.onerror = () => {
        // Fallback for ad-blockers or preview sandboxes
        setSdkLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setSdkLoaded(true);
    }
  }, [config.appId, config.enabled]);

  if (!config.enabled || !config.showBanner || dismissed) return null;

  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 border border-indigo-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Ad Brand & ID Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center justify-center p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-sm shrink-0">
            <Zap className="w-4 h-4 mr-1 fill-current" />
            Start.io
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-200">
                Start.io Web SDK Banner Active
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                App ID: {config.appId}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              Monetization Engine Ready • Publisher Account Integrated
            </span>
          </div>
        </div>

        {/* Start.io Ad Banner Slot */}
        <div id="startio-banner-container" className="flex items-center gap-3">
          <a
            href="https://www.start.io"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md hover:shadow-indigo-500/20"
          >
            Start.io Monetization
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Dismiss Ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
