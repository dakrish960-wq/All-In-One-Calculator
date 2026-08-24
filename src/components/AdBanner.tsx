import React, { useState, useEffect } from 'react';
import { StartIoConfig, Language } from '../types';
import { X, Zap } from 'lucide-react';

interface AdBannerProps {
  config: StartIoConfig;
  lang: Language;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

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
        if ((window as any).startapp) {
          try {
            (window as any).startapp.init({ appId: config.appId });
          } catch (e) {
            console.log('Start.io SDK Error:', e);
          }
        }
      };
      document.head.appendChild(script);
    }
  }, [config.appId, config.enabled]);

  if (!config.enabled || !config.showBanner || dismissed) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 px-2">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-3 border border-indigo-500/30 shadow-md flex flex-col items-center justify-between gap-2">
        {/* Ad Label Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
              <Zap className="w-3 h-3 mr-0.5 fill-current" />
              Ad
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              App ID: {config.appId}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Dismiss Ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real Start.io Ad Render Container */}
        <div id="startio-banner-container" className="w-full flex items-center justify-center min-h-[50px]">
          {/* Start.io Web SDK rendering slot */}
          <div 
            className="startapp-banner w-full flex justify-center items-center text-xs text-slate-500"
            data-app-id={config.appId}
          >
            <span>Loading Sponsored Ad...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
