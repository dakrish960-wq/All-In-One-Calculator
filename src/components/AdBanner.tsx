import React, { useEffect } from 'react';
import { StartIoConfig } from '../types';

interface AdBannerProps {
  config: StartIoConfig;
}

export const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  const appId = config.appId || '208473910';

  useEffect(() => {
    if (!config.enabled || !config.showBanner) return;

    // Load Start.io Official SDK Script dynamically
    const scriptId = 'startio-sdk-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.startappservice.com/js/startapp-publisher-3.0.0.min.js';
      script.async = true;
      script.onload = () => {
        // Reinitialize any ads on the page
        if (window.StartAppAds) {
          window.StartAppAds.init();
        }
      };
      document.body.appendChild(script);
    }
  }, [config.enabled, config.showBanner]);

  if (!config.enabled || !config.showBanner) return null;

  return (
    <div className="w-full max-w-lg mx-auto my-2 px-2 flex justify-center items-center">
      <div className="w-full min-h-[60px] bg-slate-900/80 border border-slate-800 rounded-xl p-1 flex items-center justify-center overflow-hidden">
        {/* Start.io Official Live Web Banner Unit - ID: 208473910 */}
        <div 
          className="startapp-ad" 
          data-app-id={appId}
          data-ad-type="banner"
          style={{ width: '100%', minHeight: '50px', display: 'block' }}
        ></div>
      </div>
    </div>
  );
};
