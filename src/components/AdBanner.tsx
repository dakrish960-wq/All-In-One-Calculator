 import React, { useState } from 'react';
import { StartIoConfig, Language } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  config: StartIoConfig;
  lang: Language;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (!config.enabled || !config.showBanner || dismissed) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-3 px-2 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-xl flex flex-col justify-between">
        
        {/* Ad Header Bar */}
        <div className="flex items-center justify-between w-full border-b border-slate-800 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 rounded">
              AD
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Sponsored
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Close Ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ad Content Display Slot */}
        <div className="w-full flex items-center justify-center min-h-[55px] bg-slate-950/70 rounded-xl p-2 border border-slate-800/50">
          <iframe
            title="Sponsored Ad Container"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: transparent; font-family: system-ui, sans-serif; }
                    .ad-card { width: 100%; text-align: center; color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; }
                    .ad-info { text-align: left; }
                    .ad-title { font-size: 13px; font-weight: 700; color: #10b981; }
                    .ad-desc { font-size: 11px; color: #94a3b8; margin-top: 1px; }
                    .ad-btn { background: #059669; color: white; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; }
                  </style>
                </head>
                <body>
                  <a href="https://www.startapp.com" target="_blank" class="ad-card">
                    <div class="ad-info">
                      <div class="ad-title">⚡ Try Top Recommended Apps</div>
                      <div class="ad-desc">Explore useful utilities and gaming apps</div>
                    </div>
                    <div class="ad-btn">Open</div>
                  </a>
                </body>
              </html>
            `}
            className="w-full h-[55px] border-0 overflow-hidden"
            scrolling="no"
          />
        </div>

      </div>
    </div>
  );
};
