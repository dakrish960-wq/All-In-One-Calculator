import React, { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const dayName = time.toLocaleDateString('en-US', { weekday: 'short' });
  const shortDateStr = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
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
    <div className="w-full">
      {/* Compact clock + calendar strip - intentionally small so it never crowds the calculator */}
      <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-900 dark:bg-slate-800/80 text-white px-3 py-1.5 shadow-md border border-slate-800 dark:border-slate-700">
        {/* Tiny digital clock */}
        <button
          onClick={() => setIs24Hour(!is24Hour)}
          title="Tap to toggle 12h/24h"
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <Clock className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide text-amber-300 tabular-nums">
            {formatTime()}
          </span>
        </button>

        <div className="h-4 w-px bg-slate-700 shrink-0" />

        {/* Tiny calendar trigger */}
        <button
          onClick={() => {
            setCalendarViewDate(new Date());
            setShowCalendarModal(true);
          }}
          title="Open calendar"
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <CalendarIcon className="w-3 h-3 text-indigo-300 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-slate-200">
            {dayName}, {shortDateStr}
          </span>
        </button>
      </div>

      {/* Interactive Full Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
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
