import { registerPlugin } from '@capacitor/core';

export interface StartIoPlugin {
  loadInterstitial(): Promise<{
    started: boolean;
  }>;

  showInterstitial(): Promise<{
    shown: boolean;
    reason?: string;
  }>;
}

export const StartIo =
  registerPlugin<StartIoPlugin>('StartIo');
