import React, { useState } from 'react'
import './Calculator.css'

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

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
    <div className="calculator">
      <div className="display">
        <input type="text" value={display} readOnly />
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="btn btn-clear">C</button>
        <button onClick={handleBackspace} className="btn btn-operator">DEL</button>
        <button onClick={() => handleOperation('%')} className="btn btn-operator">%</button>
        <button onClick={() => handleOperation('/')} className="btn btn-operator">÷</button>

        <button onClick={() => handleNumber('7')} className="btn">7</button>
        <button onClick={() => handleNumber('8')} className="btn">8</button>
        <button onClick={() => handleNumber('9')} className="btn">9</button>
        <button onClick={() => handleOperation('*')} className="btn btn-operator">×</button>

        <button onClick={() => handleNumber('4')} className="btn">4</button>
        <button onClick={() => handleNumber('5')} className="btn">5</button>
        <button onClick={() => handleNumber('6')} className="btn">6</button>
        <button onClick={() => handleOperation('-')} className="btn btn-operator">−</button>

        <button onClick={() => handleNumber('1')} className="btn">1</button>
        <button onClick={() => handleNumber('2')} className="btn">2</button>
        <button onClick={() => handleNumber('3')} className="btn">3</button>
        <button onClick={() => handleOperation('+')} className="btn btn-operator">+</button>

        <button onClick={() => handleNumber('0')} className="btn btn-zero">0</button>
        <button onClick={handleDecimal} className="btn">.</button>
        <button onClick={handleEquals} className="btn btn-equals">=</button>
      </div>
    </div>
  )
}

export default Calculator