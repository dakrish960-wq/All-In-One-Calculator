import React, { useState } from 'react'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>All-In-One Calculator</h1>
      <Calculator />
    </div>
  )
}

export default App