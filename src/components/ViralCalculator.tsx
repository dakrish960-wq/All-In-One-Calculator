import React, { useState } from 'react';
import { Sparkles, TrendingUp, Flame, Play, Share2, Award, Copy, Check, MessageSquare, ThumbsUp, Eye, DollarSign } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ViralCalculatorProps {
  lang: Language;
}

export const ViralCalculator: React.FC<ViralCalculatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [platform, setPlatform] = useState<'tiktok' | 'reels' | 'youtube' | 'facebook'>('tiktok');
  const [views, setViews] = useState<number>(50000);
  const [likes, setLikes] = useState<number>(5000);
  const [comments, setComments] = useState<number>(450);
  const [shares, setShares] = useState<number>(800);
  const [followers, setFollowers] = useState<number>(10000);
  const [duration, setDuration] = useState<number>(30); // 30 seconds default
  const [copied, setCopied] = useState<boolean>(false);

  // Engagement Rate (%)
  const totalInteractions = likes + comments + shares;
  const engagementRate = views > 0 ? (totalInteractions / views) * 100 : 0;

  // Like to view ratio, Comment to view ratio, Share to view ratio
  const likeRatio = views > 0 ? (likes / views) * 100 : 0;
  const commentRatio = views > 0 ? (comments / views) * 100 : 0;
  const shareRatio = views > 0 ? (shares / views) * 100 : 0;

  // Viral Score Algorithm (0 to 100)
  // Shares carry 3x weight, Comments 2x weight, Likes 1x weight in social algorithms!
  let rawViralScore = (likeRatio * 2.5) + (commentRatio * 8.0) + (shareRatio * 15.0);
  if (views > followers * 3 && followers > 0) rawViralScore += 15; // Viral out-of-follower reach bonus!
  if (duration >= 15 && duration <= 60) rawViralScore += 10; // Optimal short-form duration bonus!

  const viralScore = Math.min(Math.max(Math.round(rawViralScore), 5), 100);

  // Score Category
  const getViralStatus = () => {
    if (viralScore >= 75) {
      return { label: t.superViral, color: 'text-rose-500 bg-rose-500/10 border-rose-200 dark:border-rose-900', icon: Flame };
    } else if (viralScore >= 50) {
      return { label: t.highViral, color: 'text-pink-500 bg-pink-500/10 border-pink-200 dark:border-pink-900', icon: TrendingUp };
    } else if (viralScore >= 30) {
      return { label: t.moderateViral, color: 'text-amber-500 bg-amber-500/10 border-amber-200 dark:border-amber-900', icon: Award };
    } else {
      return { label: t.lowViral, color: 'text-slate-500 bg-slate-500/10 border-slate-200 dark:border-slate-800', icon: Sparkles };
    }
  };

  const viralStatus = getViralStatus();

  // Estimated Reach Push
  const estimatedReach = views > 0 ? Math.round(views * (1 + viralScore / 40)) : 0;

  // Estimated Monetization Earnings Range (CPM average $0.02 - $0.50 per 1k views on short-form)
  const estMinEarnings = Math.round((views / 1000) * 0.05);
  const estMaxEarnings = Math.round((views / 1000) * 0.35);

  const handleCopy = () => {
    const text = `${t.viralTitle}:\nPlatform: ${platform.toUpperCase()}\n${t.viewsCount}: ${views.toLocaleString()}\n${t.engagementRate}: ${engagementRate.toFixed(2)}%\n${t.viralPotential}: ${viralScore}/100 (${viralStatus.label})\nEst. Reach Push: ${estimatedReach.toLocaleString()}\nEst. Earnings: $${estMinEarnings} - $${estMaxEarnings}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-pink-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.viralTitle}</h2>
            <p className="text-pink-100 text-xs sm:text-sm mt-0.5">{t.viralSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {t.platform}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'tiktok', name: 'TikTok' },
                { id: 'reels', name: 'IG Reels' },
                { id: 'youtube', name: 'YT Shorts' },
                { id: 'facebook', name: 'FB Video' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    platform === p.id
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20 ring-2 ring-pink-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.viewsCount}
              </label>
              <input
                type="number"
                min="0"
                value={views}
                onChange={(e) => setViews(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.likesCount}
              </label>
              <input
                type="number"
                min="0"
                value={likes}
                onChange={(e) => setLikes(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.commentsCount}
              </label>
              <input
                type="number"
                min="0"
                value={comments}
                onChange={(e) => setComments(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.sharesCount}
              </label>
              <input
                type="number"
                min="0"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.followerCount}
              </label>
              <input
                type="number"
                min="0"
                value={followers}
                onChange={(e) => setFollowers(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                {t.videoDuration}
              </label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Output Metrics Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-slate-900 dark:to-pink-950/40 p-6 rounded-3xl border border-pink-100 dark:border-pink-900/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Viral Meter
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200 text-xs font-semibold cursor-pointer hover:bg-pink-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyResult}
              </button>
            </div>

            {/* Viral Score Circular/Meter Display */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-pink-100 dark:border-slate-700 text-center space-y-2 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                {t.viralPotential}
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-black text-pink-600 dark:text-pink-400">
                  {viralScore}
                </span>
                <span className="text-slate-400 text-xl font-bold">/ 100</span>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${viralStatus.color}`}>
                  {viralStatus.label}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-pink-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.engagementRate}
                </span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                  {engagementRate.toFixed(2)}%
                </span>
              </div>

              <div className="p-3.5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-pink-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.estimatedReach}
                </span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                  ~{estimatedReach.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Estimated Earnings */}
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.estimatedMonetization}
                </span>
              </div>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                ${estMinEarnings} - ${estMaxEarnings} USD
              </span>
            </div>

            {/* AI Recommendation Tips */}
            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-200 dark:border-purple-900/50 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-purple-900 dark:text-purple-300 block">
                💡 {t.viralInsights}:
              </span>
              {shareRatio < 1.0 && (
                <p>• Encourage shares by placing a strong CTA at second 5 (e.g., "Share with a friend who needs this").</p>
              )}
              {duration > 45 && (
                <p>• Shorten video hook length to under 30s to maximize 100% completion rate in algorithm push.</p>
              )}
              {commentRatio < 0.8 && (
                <p>• Ask an open question in the video caption or text overlay to drive comment interaction.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
