import React from 'react';
import { StartIoConfig, Language } from '../types';

interface AdBannerProps {
  config: StartIoConfig;
  lang: Language;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  if (!config.enabled || !config.showBanner) return null;

  return (
    <div className="w-full max-w-lg mx-auto my-2 px-2">
      <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-slate-950 rounded">
            AD
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Sponsored Ad Area
          </span>
        </div>
        <span className="text-[10px] text-slate-500">
          App ID: {config.appId}
        </span>
      </div>
    </div>
  );
};
