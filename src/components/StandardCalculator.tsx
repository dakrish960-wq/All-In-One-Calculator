import React, { useState, useEffect } from 'react'
import { Delete, History, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Language } from '../types'
import { translations } from '../data/translations'

interface StandardCalculatorProps {
  lang: Language
}

interface HistoryEntry {
  id: string
  expression: string
  result: string
}

const HISTORY_STORAGE_KEY = 'standardCalculatorHistory'

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({ lang }) => {
  const t = translations[lang]
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load saved history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY)
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  // Persist history whenever it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
  }, [history])

  // Give every button tap a brief, visible "pressed" state
  const flashKey = (key: string) => {
    setPressedKey(key)
    window.setTimeout(() => {
      setPressedKey((current) => (current === key ? null : current))
    }, 180)
  }

  const handleNumber = (num: string) => {
    flashKey(num)
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (op: string, key: string) => {
    flashKey(key)
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(result.toString())
      setPreviousValue(result)
    }

    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      case '%':
        return prev % current
      default:
        return current
    }
  }

  const handleEquals = () => {
    flashKey('=')
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      const expression = `${previousValue} ${operation} ${currentValue}`

      setHistory((prevHistory) =>
        [
          { id: `${Date.now()}`, expression, result: result.toString() },
          ...prevHistory,
        ].slice(0, 20)
      )

      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    flashKey('C')
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    flashKey('.')
    if (newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleBackspace = () => {
    flashKey('DEL')
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
      setNewNumber(true)
    }
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const isPressed = (key: string) => pressedKey === key

  // Shared button style builder: adds a strong, visible pressed state on tap
  const buttonClass = (key: string, base: string) =>
    `relative py-4 rounded-xl text-lg font-bold transition-all duration-100 select-none active:scale-90 ${base} ${
      isPressed(key)
        ? 'scale-90 ring-4 ring-offset-2 ring-emerald-400 dark:ring-offset-slate-900 brightness-110'
        : 'scale-100'
    }`

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-300/50 dark:shadow-black/40 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 ring-1 ring-slate-900/5">
        {/* Display */}
        <div className="mb-5 p-4 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 rounded-2xl shadow-inner">
          {operation && previousValue !== null && (
            <div className="text-right text-xs font-mono text-slate-400 mb-1 truncate">
              {previousValue} {operation}
            </div>
          )}
          <input
            type="text"
            value={display}
            readOnly
            className="w-full text-right text-4xl font-bold text-emerald-400 bg-transparent outline-none truncate"
          />
        </div>

        {/* History Toggle */}
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="w-full flex items-center justify-between px-3 py-2 mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            {t.historyLog || t.history} {history.length > 0 && `(${history.length})`}
          </span>
          {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showHistory && (
          <div className="mb-5 max-h-40 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
            {history.length === 0 ? (
              <p className="text-xs text-center text-slate-400 py-4">{t.noHistory}</p>
            ) : (
              <>
                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                  {history.map((entry) => (
                    <li key={entry.id} className="px-3 py-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-500 dark:text-slate-400 truncate pr-2">
                        {entry.expression} =
                      </span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                        {entry.result}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleClearHistory}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  {t.clearHistory}
                </button>
              </>
            )}
          </div>
        )}

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className={`${buttonClass('C', 'col-span-2 bg-red-500 hover:bg-red-600 text-white')}`}
          >
            C
          </button>
          <button
            onClick={handleBackspace}
            className={buttonClass('DEL', 'bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center')}
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleOperation('%', '%')}
            className={buttonClass('%', 'bg-purple-500 hover:bg-purple-600 text-white')}
          >
            %
          </button>

          {/* Row 2 */}
          <button onClick={() => handleNumber('7')} className={buttonClass('7', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>7</button>
          <button onClick={() => handleNumber('8')} className={buttonClass('8', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>8</button>
          <button onClick={() => handleNumber('9')} className={buttonClass('9', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>9</button>
          <button onClick={() => handleOperation('/', '/')} className={buttonClass('/', 'bg-indigo-500 hover:bg-indigo-600 text-white')}>÷</button>

          {/* Row 3 */}
          <button onClick={() => handleNumber('4')} className={buttonClass('4', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>4</button>
          <button onClick={() => handleNumber('5')} className={buttonClass('5', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>5</button>
          <button onClick={() => handleNumber('6')} className={buttonClass('6', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>6</button>
          <button onClick={() => handleOperation('*', '*')} className={buttonClass('*', 'bg-indigo-500 hover:bg-indigo-600 text-white')}>×</button>

          {/* Row 4 */}
          <button onClick={() => handleNumber('1')} className={buttonClass('1', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>1</button>
          <button onClick={() => handleNumber('2')} className={buttonClass('2', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>2</button>
          <button onClick={() => handleNumber('3')} className={buttonClass('3', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>3</button>
          <button onClick={() => handleOperation('-', '-')} className={buttonClass('-', 'bg-indigo-500 hover:bg-indigo-600 text-white')}>−</button>

          {/* Row 5 */}
          <button onClick={() => handleNumber('0')} className={buttonClass('0', 'col-span-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>0</button>
          <button onClick={handleDecimal} className={buttonClass('.', 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white')}>.</button>
          <button onClick={() => handleOperation('+', '+')} className={buttonClass('+', 'bg-indigo-500 hover:bg-indigo-600 text-white')}>+</button>

          {/* Equals Button */}
          <button
            onClick={handleEquals}
            className={`${buttonClass('=', 'col-span-4 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30')}`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}
