/**
 * App sharing utility with configurable download URL.
 *
 * To update the download link, change the APP_DOWNLOAD_URL constant below.
 * This can later be replaced with the real APK or Play Store link.
 */

export const APP_DOWNLOAD_URL = 'https://github.com/dakrish960-wq/All-In-One-Calculator/releases/latest/download/app-release.apk';

export const APP_NAME = 'All In One Calculator';

/**
 * Builds the share message that includes the app name and download link.
 */
export function buildShareText(): string {
  return `${APP_NAME} - Fast, Offline & Modern Multi-Calculator\n\nDownload now: ${APP_DOWNLOAD_URL}`;
}

/**
 * Attempts to share the app using the Web Share API.
 * Falls back to copying the share text to clipboard.
 *
 * @returns `{ method: 'share' }` if native share was used,
 *          `{ method: 'clipboard' }` if clipboard fallback was used,
 *          `{ method: 'none', error }` if both failed.
 */
export async function shareApp(): Promise<
  | { method: 'share' }
  | { method: 'clipboard' }
  | { method: 'none'; error: unknown }
> {
  const shareText = buildShareText();

  const shareData: ShareData = {
    title: APP_NAME,
    text: shareText,
    url: APP_DOWNLOAD_URL,
  };

  // Try Web Share API first (works on Android WebView / Capacitor)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { method: 'share' };
    } catch (err) {
      // User cancelled or share failed – fall through to clipboard
      console.log('Share cancelled or failed, trying clipboard fallback:', err);
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(shareText);
    return { method: 'clipboard' };
  } catch (err) {
    console.error('Clipboard fallback also failed:', err);
    return { method: 'none', error: err };
  }
}
