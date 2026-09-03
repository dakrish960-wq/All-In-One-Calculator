import React, { useState, useEffect } from 'react'
import { CalculatorType, Language } from '../types'
import { translations } from '../data/translations'

interface StandardCalculatorProps {
  lang: Language
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({ lang }) => {
  const t = translations[lang]
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)
  const [showAd, setShowAd] = useState(false)

  useEffect(() => {
    // Show ad after 5 calculations
    const calculateCount = parseInt(localStorage.getItem('calculateCount') || '0')
    if (calculateCount > 0 && calculateCount % 5 === 0) {
      setShowAd(true)
      setTimeout(() => setShowAd(false), 3000)
    }
  }, [display])

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
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
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation)
      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
      
      // Track calculation count
      const count = parseInt(localStorage.getItem('calculateCount') || '0')
      localStorage.setItem('calculateCount', String(count + 1))
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
      setNewNumber(true)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Ad Banner */}
      {showAd && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white text-center text-sm font-bold">
          📢 Advertisement Area - Start.io Ads will appear here
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
        {/* Display */}
        <div className="mb-6 p-4 bg-slate-900 dark:bg-slate-800 rounded-2xl">
          <input
            type="text"
            value={display}
            readOnly
            className="w-full text-right text-4xl font-bold text-emerald-400 bg-transparent outline-none"
          />
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="col-span-2 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            C
          </button>
          <button
            onClick={handleBackspace}
            className="py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            DEL
          </button>
          <button
            onClick={() => handleOperation('%')}
            className="py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            %
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleNumber('7')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            7
          </button>
          <button
            onClick={() => handleNumber('8')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            8
          </button>
          <button
            onClick={() => handleNumber('9')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('/')}
            className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            ÷
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleNumber('4')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            4
          </button>
          <button
            onClick={() => handleNumber('5')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            5
          </button>
          <button
            onClick={() => handleNumber('6')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('*')}
            className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            ×
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleNumber('1')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            1
          </button>
          <button
            onClick={() => handleNumber('2')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            2
          </button>
          <button
            onClick={() => handleNumber('3')}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            3
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            −
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-lg font-bold transition transform hover:scale-105"
          >
            .
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105"
          >
            +
          </button>

          {/* Equals Button */}
          <button
            onClick={handleEquals}
            className="col-span-4 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-lg transition transform hover:scale-105 shadow-lg shadow-emerald-500/30"
          >
            =
          </button>
        </div>
      </div>

      {/* Ad Section */}
      <div className="mt-6 p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 text-center">
        <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">📺 Advertisement Space</h3>
        <p className="text-xs text-slate-500 dark:text-slate-500">Start.io Ads (ID: 208473910) will display here in production</p>
      </div>
    </div>
  )
}
