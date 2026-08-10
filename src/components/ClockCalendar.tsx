import React, { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

export const ClockCalendar: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
  
  // State for browsing calendar month/year
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time string
  const formatTime = () => {
    if (is24Hour) {
      return time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return time.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Format date strings
  const dayName = time.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDateStr = time.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Calendar calculation helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth();
  const monthName = calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const resetToToday = () => {
    setCalendarViewDate(new Date());
  };

  const isToday = (dayNum: number) => {
    const today = new Date();
    return (
      today.getDate() === dayNum &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  return (
    <div className="w-full my-3">
      {/* Eye-catching Clock & Calendar Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Background decorative glow elements */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Clock Section (Prominent & Eye-catching) */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 font-black">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  Live Clock
                </span>
                <button
                  onClick={() => setIs24Hour(!is24Hour)}
                  className="text-[10px] font-mono font-semibold text-slate-400 hover:text-white underline cursor-pointer"
                  title="Toggle 12h/24h Format"
                >
                  {is24Hour ? '24-Hour' : '12-Hour'}
                </button>
              </div>
              {/* Extra prominent clock time */}
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400 drop-shadow-sm mt-0.5">
                {formatTime()}
              </div>
            </div>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block h-10 w-px bg-slate-800" />

        {/* Calendar Section (Prominent Date & Interactive Toggle) */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 font-black">
              <CalendarIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/30">
                  Today's Date
                </span>
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {dayName}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-wide mt-0.5">
                {fullDateStr}
              </div>
            </div>
          </div>

          {/* Calendar View Button */}
          <button
            onClick={() => {
              setCalendarViewDate(new Date());
              setShowCalendarModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md border border-indigo-400/30 cursor-pointer shrink-0"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Open Calendar</span>
          </button>
        </div>
      </div>

      {/* Interactive Full Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500 text-white">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">Calendar</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">View months and dates</p>
                </div>
              </div>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Controls */}
            <div className="flex items-center justify-between my-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="font-bold text-base text-indigo-600 dark:text-indigo-400">
                  {monthName}
                </span>
                <button
                  onClick={resetToToday}
                  className="block mx-auto text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline mt-0.5"
                >
                  Jump to Today
                </button>
              </div>

              <button
                onClick={nextMonth}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
              {/* Empty leading slots */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="h-9" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const dayNum = index + 1;
                const active = isToday(dayNum);
                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`h-9 flex items-center justify-center rounded-xl transition font-mono ${
                      active
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-md shadow-indigo-500/30 scale-105 ring-2 ring-indigo-400/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer Info */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" /> Today is {dayName}, {time.getDate()} {time.toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
